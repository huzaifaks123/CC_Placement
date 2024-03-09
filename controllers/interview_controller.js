const Interview = require('../models/interview_model')
const Student = require('../models/student_model')
const excelJs = require('exceljs')

module.exports.interviewList = async function (req, res) {
    try {
        let interviews = await Interview.find({})
        let students = await Student.find({})
        if (req.isAuthenticated()) {
            return res.render('interviews_list', {
                interviews: interviews,
                students: students,
                user: req.user
            })
        } else {
            return res.redirect('/user/sign-in')
        }

    } catch (error) {
        console.log("Error while fetching interview :", error)
    }
}

module.exports.createInterview = async (req, res) => {
    try {
        let isCompany = await Interview.findOne({ company_name: req.body.company_name })
        console.log(isCompany, "ffffffff", req.body.company_name)
        if (!isCompany) {
            let interview = await Interview.create(req.body)
            return res.redirect('back')
        } else {
            return res.redirect('back')
        }

    } catch (error) {
        console.log("error creating new company :", error)
    }

}

module.exports.exportFile = async (req, res) => {
    try {
        const workbook = new excelJs.Workbook();
        const worksheet = workbook.addWorksheet("Interview Data");
        let students = await Student.find({})
        worksheet.columns = [
            { header: "Sr no.", key: "sr_no" },
            { header: "Company Name", key: "company_name" },
            { header: "Date", key: "interview_date" },
            { header: "Student Applied", key: "studentApplied" },
        ];

        let serialnumber = 1;

        const interviews = await Interview.find({})
        interviews.forEach(interview => {
            const studentsApplied = students.filter(student => {
                return student.company_applied.some(companyApplied => companyApplied.company_name !== interview.company_name)
            })
            interview.sr_no = serialnumber;
            interview.studentApplied = studentsApplied.map(student => `${student.student_name}`).join(", ")
            worksheet.addRow(interview)
            serialnumber++
        });

        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true }
        })

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )
        res.setHeader("Content-Disposition", `attachment; filename=interview.xlsx`)

        return workbook.xlsx.write(res).then(() => {
            res.status(200)
        })

    } catch (error) {
        console.log("Error exporting file :", error)
    }
}



module.exports.updateStudent = async (req, res) => {

    let student = await Student.findOne({ _id: req.params.studentId })
    console.log("student", student)
    const index = student.company_applied.findIndex(company => company.company_id == req.params.companyId)
    console.log("index", index)
    if (index !== -1) {
        student.company_applied[index].placement_result = req.params.status
        console.log("req.params.status", req.params.status)
        await student.save();
        return res.redirect('back')
    } else {
        console.log("not found")
    }

    // filter(companyApplied => companyApplied.company_id !== req.params.companyId)
    // console.log(req.params.companyId,"company=========", student.company_applied)
    // student.company_applied = student.company_applied.filter(companyApplied => companyApplied.id !== req.params.companyId);
    // student.company_applied.push(interview)
    // console.log(student.company_applied.id)
    // console.log(req.body, "----------------------------------------", req.params.companyId, req.params.studentId)
}