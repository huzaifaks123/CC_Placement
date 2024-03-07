const Student = require('../models/student_model')
const Interview = require('../models/interview_model')
const excelJs = require('exceljs')

module.exports.createStudent = async (req, res) => {
    let student = await Student.create(req.body)
    // try {
    //     if (student.xhr) {
    //         return res.status(200).json({
    //             data: {
    //                 student: student
    //             },
    //             Message: "Student Created"
    //         })
    //     }
    return res.redirect('back')
    // } catch (error) {
    //     console.log("Error while creating post", error)
    // }
    // .then(student => {
    //     console.log("new student added", req.body)
    // })
    // .catch(err => {
    //     console.log("Error occured while adding new student", err)
    //     return res.redirect('/user/sign-in')
    // })
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
            { header: "Course Score", key: "course_score" },
            { header: "Companies", key: "companies" },
        ];

        let serialnumber = 1;

        const students = await Student.find({})
        students.forEach(student => {
            // const studentsApplied = students.filter(student => {
            //     return student.company_applied.map(company => company.company_name)
            // })
            let companyNames = student.company_applied.map(company => company.company_name).join(", ")
            console.log(companyNames)
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
            // appliedStudents : 
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
    // student.company_applied = student.company_applied.filter(companyApplied => companyApplied.id !== req.params.companyId);
    // student.company_applied.push(interview)
    // console.log(req.body, "----------------------------------------", req.params.companyId, req.params.studentId)
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