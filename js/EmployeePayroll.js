const salary = document.querySelector('#salary');
        const output = document.querySelector('.salary-output');
        output.textContent = salary.value;
        salary.addEventListener('input', function() {
            output.textContent = salary.value;
        });        

class EmployeePayrollData {
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
            throw "Invelid Date"
    }

    get notes() { return this._notes; }
    set notes(notes) {
        this._notes = notes;
    }

    toString() {
        const empDate = this._startDate.toLocaleString().split(',')[0];
        return "name = " + this.name + ", profilePic = " + this.profilePic + ", salary = " + this.salary + ", gender = " + this.gender + ", department = " + this.department + ", startDate = " + empDate + ", notes= " + this.notes;
    }
}

function createObject() {
    let employeePayrollData = new EmployeePayrollData();
    employeePayrollData.name = getInputValue("name");
    employeePayrollData.profilePic = getSelectedValues("[name = profile]").pop();
    employeePayrollData.gender = getSelectedValues("[name = gender]").pop();
    employeePayrollData.department = getSelectedValues("[name = department]");
    employeePayrollData.salary = getInputValue("salary");
    employeePayrollData.notes = getInputValue("notes");
    employeePayrollData.startDate = new Date(getInputValue("year") + getInputValue("month") + getInputValue("day"));
    alert(employeePayrollData.toString());

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