let isUpdate = false;
let employeePayrollObj = {};
window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function() {
        if(name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new EmployeePayrollData().name) = name.value;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });
    const salary = document.querySelector('#salary');
        const output = document.querySelector('.salary-output');
        output.textContent = salary.value;
        salary.addEventListener('input', function() {
            output.textContent = salary.value;
        }); 

        checkForUpdate();
    });               

class EmployeePayrollData {
    get id() {return this._id;}
    set id(id) {
        this._id = id;
    }
    get name() { return this._name; }
    set name(name) {
        let nameRegex = RegExp('^[A-Z][a-z]{2,}$');
        if (nameRegex.test(name))
            this._name = name; 
        else
            throw "Name is Incorrect"; 
    }
    get profilePic() { return this._profilePic; }
    set profilePic(profilePic) { this._profilePic = profilePic; }

    get salary() { return this._salary; }
    set salary(salary) {
        this._salary = salary;
    }
    get gender() { return this._gender; }
    set gender(gender) {
        this._gender = gender;
    }
    get department() { return this._department; }
    set department(department) { this._department = department; }

    get startDate() { return this._startDate; }
    set startDate(startDate) {
        if (startDate < new Date)
            this._startDate = startDate;
        else
            throw "Invalid Date";
    }

    get notes() { return this._notes; }
    set notes(notes) {
        this._notes = notes;
    }

    toString() {
        const empDate = this._startDate.toLocaleString().split(',')[0];
        return "id = " + this._id + ", name = " + this.name + ", profilePic = " + this.profilePic + ", salary = " + this.salary +
        ", gender = " + this.gender + ", department = " + this.department + ", startDate = " + empDate + ", notes= " + this.notes;
    }
}

function createEmployeePayroll() {
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = getInputValue("name");
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    
    employeePayrollData.profilePic = getSelectedValues("[name = profile]").pop();
    employeePayrollData.gender = getSelectedValues("[name = gender]").pop();
    employeePayrollData.department = getSelectedValues("[name = department]");
    employeePayrollData.salary = getInputValue("salary");
    employeePayrollData.notes = getInputValue("notes");
    employeePayrollData.startDate = new Date(getInputValue("year") + getInputValue("month") +
                                     getInputValue("day"));
    alert(employeePayrollData.toString());
    return employeePayrollData;
}

function save() {
    try {
        let employeePayrollData = createEmployeePayroll();
        //callAPI(employeePayrollData);
        // const xhr = new XMLHttpRequest();
        // xhr.open("POST", "http://localhost:8080/employee/addemployee");
        // xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        // const body = JSON.stringify({
        //     name: employeePayrollData._name,
        //     salary: employeePayrollData._salary,
        //     gender: employeePayrollData._gender
        // });
        // xhr.onload = () => {
        //     if (xhr.readyState == 4 && xhr.status == 201) {
        //         console.log(JSON.parse(xhr.responseText));
        //     } else {
        //         console.log(`Error: ${xhr.status}`);
        //     }
        // };
        // xhr.send(body);
        createAndUpdateStorage(employeePayrollData);
    } catch (e) {
        return;
    }
}

async function callAPI(employeePayrollData) {
    console.log(employeePayrollData.toString());
    await fetch ('http://localhost:8080/employee/addemployee', {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }, 
            body: JSON.stringify ({
                // employeePayrollData,
                _name: employeePayrollData._name,
                _salary: employeePayrollData._salary,
                _gender: employeePayrollData._gender
                // departmentList: employeePayrollData._department,
                // date: employeePayrollData._startDate,
                // notes: employeePayrollData._notes
            })
        });
}

function getInputValue(id) {
    let value = document.getElementById(id).value;
    return value;
}

function getSelectedValues(property) {
    let allItems = document.querySelectorAll(property);
    let selectedItems = [];
    allItems.forEach(item => {
        if (item.checked)
            selectedItems.push(item.value);
    });
    return selectedItems;
}

function createAndUpdateStorage (employeePayrollData) {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));

    if(employeePayrollList != undefined) {
        employeePayrollList.push(employeePayrollData);
    } else {
        employeePayrollList = [employeePayrollData]
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

const setForm = () => {
    setValue('#name', employeePayrollObj._name);
    setSelectedValues('[name=profile]', employeePayrollObj._profilePic);
    setSelectedValues('[name=gender]', employeePayrollObj._gender);
    setSelectedValues('[name=department]', employeePayrollObj._department);
    setValue('#salary', employeePayrollObj._salary);
    setTextValue('.salary-output', employeePayrollObj._salary);
    setValue('#notes', employeePayrollObj._notes);
    let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);
}

const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if (Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        }
        else if (item.value === value)
            item.checked = true;
    });
}

const resetForm = () => {
    setValue('#name', '');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary', '');
    setValue('#notes', '');
    setSelectedIndex('#day', 0);
    setSelectedIndex('#month', 0);
    setSelectedIndex('#year', 0);
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const setSelectedIndex = (id , index) => {
    const element = document.querySelector(id);
    element.selectedIndex = index;
}

const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    if (!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
}
