module.exports = {
    
    emailValidate: email=>{
        const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(email.match(validEmail)){
            return true;
        }else{
            return false
        }
    },

    phoneValidate: phone=>{
        if(phone.toString().length!=10)
            return false
        if(phone.toString()[0]>'0' && phone.toString()[0]<"6")
            return false

        return true;
    }
}