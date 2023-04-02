const statistic_Model = require('../../models/admin/admin_statistic_Model');

var date = new Date()
const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];
let statistic = async(req, res) => {
   // console.log(await statistic_Model.statisticOrder(date.getMonth()+1))
    return res.render("adminpage/statistic",{
        check:req.user,
        best: await statistic_Model.getTop5BestSale(date.getMonth()+1),
        //bad: await statistic_Model.getTop5BadSale(date.getMonth()+1),
        order: await statistic_Model.statisticOrder(date.getMonth()+1),
        orderInput: await statistic_Model.statisticOrderInput(date.getMonth()+1),
        bestInput: await statistic_Model.getTop5Input(date.getMonth()+1),
        month:monthNames[date.getMonth()],
        layout:'admin'
    })
};
let statisticFormonth = async(req, res) => {
    return res.render("adminpage/statistic",{
        check:req.user,
        best: await statistic_Model.getTop5BestSale(req.params.id),
       // bad: await statistic_Model.getTop5BadSale(req.params.id),
        order: await statistic_Model.statisticOrder(req.params.id),
        orderInput: await statistic_Model.statisticOrderInput(req.params.id),
        bestInput: await statistic_Model.getTop5Input(req.params.id),
        month:monthNames[req.params.id-1],
        layout:'admin'
    })
};
module.exports= {
    statistic:statistic,
    statisticFormonth:statisticFormonth
}