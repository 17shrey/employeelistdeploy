const express = require("express");
const fs = require("fs");
const multer = require("multer");
const Employee = require("../model/employee");
app = express();
app.use(express.json());


//imagepath saving
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "C:/Users/shrey/OneDrive/Desktop/DEALSDRAY/client/public/images");
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    },
});
const upload = multer({ storage });

app.post("/api/upload", upload.single("image"), (req, res) => {
    res.send({ message: "Image uploaded successfully." });
});


//save new employee
app.post("/employeesave", async (req, res) => {
    var { f_id, f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course } = req.body;
    console.log(req.body);
    //remove fakepath string from imagepath
    var f_Image =
        "images/" + req.body.f_Image.substring(12, req.body.f_Image.length);

    if (!f_id || !f_Image || !f_Name || !f_Email || !f_Mobile || !f_Designation || !f_Gender || !f_Course ) {
        return res.status(422).json({ error: "please fill all mandatory fields." })
    }
    try {
        emailexist = await Employee.findOne({ f_Email: f_Email })
        if (emailexist) {
            return res.status(402).json({ error: "Email is already exist. Choose another email." })
        } else {
            const employee = new Employee({ f_id, f_Image, f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course })
            await employee.save();
            return res.status(202).json({ success: "Employee added successfully." })
        }
    } catch (err) {
        console.log(err)
    };

});

// show employee details list
app.get("/showemployee", async (req, res) => {
    res.json(await Employee.find({}));
});

//delete employee
app.delete("/employee/:id", async (req, res) => {
    console.log(req.params.id)

    if (req.params.id === null) {
        console.log("id not present");
        return res.status(403).json({ error: "id not present" });
    } else {
        const data = await Employee.findByIdAndDelete(req.params.id);
        console.log(data);
        return res.status(201).json({ success: "delete request" });
    }
})


app.get("/employee/:id",async (req,res) => {
    console.log(req.params.id)

    const data = await Employee.findById(req.params.id)
    res.json(data);
})
app.put("/employee/:id", async (req, res) => {
    const employeeId = req.params.id;
    const { f_id, f_Image, f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course, f_Createdate } = req.body;

    if (!f_id || !f_Name || !f_Email || !f_Mobile || !f_Designation || !f_Gender || !f_Course || !f_Createdate) {
        return res.status(422).json({ error: "Please fill all mandatory fields" });
    }

    try {
        // Check if f_id is already taken
        const existingEmployee = await Employee.findOne({ f_id });
        if (existingEmployee.f_id && existingEmployee._id != employeeId) {
            return res.status(422).json({ error: "f_id must be unique" });
        }
        let updatedImage = existingEmployee.f_Image; // Use the existing image path by default

        // Check if a new image is selected
        if (req.body.f_Image !== existingEmployee.f_Image) {
            updatedImage = "images/" + req.body.f_Image.substring(12, req.body.f_Image.length);
        }

        const employeeProduct = await Employee.findByIdAndUpdate(
            employeeId,
            { f_id, f_Image: updatedImage, f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course, f_Createdate },
            { new: true }
        );

        if (!employeeProduct) {
            return res.status(404).json({ error: "Employee not found" });
        }

        return res.status(200).json({ success: "Employee updated successfully", data: employeeProduct });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = app;