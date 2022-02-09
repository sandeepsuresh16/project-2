export const baseUrl = 'http://localhost:5000'



export const menuItems = [
    {name:"Dashboard",to:"/admin/", iconClassName:'bi bi-microsoft'},
    {
        name:"Academics",
        iconClassName:"bi bi-mortarboard-fill",
        to:"admin/academics",
        subMenus:[
            {name:"Student",to:'academics/student'},
            {name:"Class",to:'academics/class'},
            {name:"Exam",to:'academics/exam'},
            {name:"Library",to:'academics/library'},
            {name:"Promotion",to:'promotion'}]
    },
    {
        name:"Attendance",
        iconClassName:'bi bi-calendar-check',
        subMenus:[
            {name:"Staff",to:'attendance-staff'},
            {name:"Student", to:'attendence-student'}]
    },
    {name:"HR", to:"admin/hr", iconClassName:'bi bi-people-fill'},
    {
        name:"Accounts",
        iconClassName:'bi bi-bank2',
        subMenus:[{name:"Fee Payment"},
        {name:"New Payment",to:'accounts'}]
    },
    {name:"SMS",iconClassName:'bi bi-envelope-fill',to:'sms'},
    {name:"Settings",to:"settings",iconClassName:'bi bi-gear-fill'}
]