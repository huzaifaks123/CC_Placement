// import model from there modules
const Interview = require("../models/interview_model");
const Student = require("../models/student_model");

// import exceljs from its modules
const excelJs = require('exceljs')

// export home module
module.exports.home = function (req, res) {
    return res.render('_home', {
        user: req.user
    })
}

// export export files modules for downloading purpose
module.exports.exportFile = async (req, res) => {
    try {
        const workbook = new excelJs.Workbook();
        const worksheet = workbook.addWorksheet("Students Data");
        worksheet.columns = [
            { header: "Sr no.", key: "sr_no" },
            { header: "Student Id", key: "id" },
            { header: "Batch", key: "batch" },
            { header: "Student Name", key: "student_name" },
            { header: "CollegeName", key: "college_name" },
            { header: "Student Status", key: "placement_status" },
            { header: "DSA Score", key: "dsa_score" },
            { header: "Web-Dev Score", key: "webd_score" },
            { header: "React Score", key: "react_score" },
            { header: "Interview Date", key: "interviewDate" },
            { header: "Interview Company", key: "companyNames" },
            { header: "Interview Result", key: "InterviewResult" },
        ];

        let serialnumber = 1;

        const students = await Student.find({})
        const interviews = await Interview.find({})
        students.forEach(student => {
            student.company_applied.forEach(company => {
                    student.companyNames = company.company_name,
                    student.interviewDate = company.interview_date,
                    student.InterviewResult = company.placement_result,
                student.sr_no = serialnumber;
                worksheet.addRow(student)
                serialnumber++
            })
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

        // handling errors
    } catch (error) {
        console.log("Error exporting file :", error)
    }
}