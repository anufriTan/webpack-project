class UserInfo {
    constructor(titleName, titleJob, editName, editJob, editPopup, form, api) {               
        this.titleName =  titleName;
        this.titleJob = titleJob;
        this.editName = editName;
        this.editJob = editJob;
        this.editPopup = editPopup;
        this.form = form;
        this.api = api;
    }
    
// Редактирование профиля
    setUserInfo = (event) => {
        event.preventDefault();

        this.api.editProfile(this.editName.value, this.editJob.value).then((res) => {
            this.titleName.textContent = res.name;
            this.titleJob.textContent = res.about;
        })
            .catch((err) => {
              console.log(err);
            });       
        this.editPopup.close();
    }

    updateUserInfo() {
        this.editName.value = this.titleName.textContent;
        this.editJob.value = this.titleJob.textContent;
    }

    addListeners() {
        this.form.addEventListener("submit", this.setUserInfo);
    }

}

