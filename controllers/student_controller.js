const Student = require('../models/student_model')
const Interview = require('../models/interview_model')
const excelJs = require('exceljs')

module.exports.createStudent = async (req, res) => {
    await Student.create(req.body)
    return res.redirect('back')
}

module.exports.exportFile = async (req, res) => {
    try {
        const workbook = new excelJs.Workbook();
        const worksheet = workbook.addWorksheet("Students Data");
        worksheet.columns = [
            { header: "Sr no.", key: "sr_no" },
            { header: "Batch", key: "batch" },
            { header: "Student Name", key: "student_name" },
            { header: "CollegeName", key: "college_name" },
            { header: "Placement Status", key: "placement_status" },
            { header: "DSA Score", key: "dsa_score" },
            { header: "Web-Dev Score", key: "webd_score" },
            { header: "React Score", key: "react_score" },
            { header: "Companies", key: "companies" },
        ];

        let serialnumber = 1;

        const students = await Student.find({})
        students.forEach(student => {
            let companyNames = student.company_applied.map(company => company.company_name).join(", ")
            console.log("companyNames",companyNames)
            student.sr_no = serialnumber;
            student.companies = companyNames
            worksheet.addRow(student)
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

module.exports.deleteStudent = async (req, res) => {
    await Student.deleteOne({ _id: req.params.id })
    return res.redirect('back')
}
module.exports.studentsList = async function (req, res) {
    try {
        // let appliedStudents = Student.fin
        let students = await Student.find({})
        return res.render('students_list', {
            students: students,
            user: req.user
        })
    } catch (error) {
        console.log("Error fetching student data")
    }

}

module.exports.addStudent = async (req, res) => {
    let student = await Student.findOne({ student_name: req.body.student_name })
    let interview = await Interview.findOne({ _id: req.params.id })
    if (student && interview) {
        student.company_applied.push({
            company_name: interview.company_name,
            interview_date: interview.interview_date,
            placement_result: "DIDN'T ATTEMPT",
            company_id: req.params.id
        })
        await student.save()
    }else{
        console.log("Error while adding")
    }
    return res.redirect('back')
}
module.exports.removeStudent = async (req, res) => {
    let student = await Student.findOne({ _id: req.params.studentId })
    student.company_applied = student.company_applied.filter(companyApplied => companyApplied.company_id !== req.params.companyId)
    await student.save();
    return res.redirect('back')
}


module.exports.removeCompany = async (req, res) => {
    await Interview.deleteOne({ _id: req.params.companyId })
    let students = await Student.find({})
    for (let student of students) {
        console.log(student.company_applied, "ID", req.params.companyId)
        student.company_applied = student.company_applied.filter(companyApplied => companyApplied.company_id !== req.params.companyId)
        await student.save();
    }
    return res.redirect('back')
}
module.exports.deleteInterview = async (req, res) => {
    console.log("inteview deleted")
    return res.redirect('back')
}