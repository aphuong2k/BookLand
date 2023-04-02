document.addEventListener("DOMContentLoaded", function () {
  // your code here
//   var citis = document.getElementById("city");
// var districts = document.getElementById("district");
// var wards = document.getElementById("ward");
// var Parameter = {
//   url: "http://localhost:5000/js/data.json", //Đường dẫn đến file chứa dữ liệu hoặc api do backend cung cấp
//   method: "GET", //do backend cung cấp
//   responseType: "application/json", //kiểu Dữ liệu trả về do backend cung cấp
// };
// //gọi ajax = axios => nó trả về cho chúng ta là một promise
// var promise = axios(Parameter);
// //Xử lý khi request thành công
// promise.then(function (result) {
//   renderCity(result.data);
// });

// function renderCity(data) {
//   for (const x of data) {
//     citis.options[citis.options.length] = new Option(x.Name, x.Id);
//   }

//   // xứ lý khi thay đổi tỉnh thành thì sẽ hiển thị ra quận huyện thuộc tỉnh thành đó
//   citis.onchange = function () {
//     district.length = 1;
//     ward.length = 1;
//     if(this.value != ""){
//       const result = data.filter(n => n.Id === this.value);

//       for (const k of result[0].Districts) {
//         district.options[district.options.length] = new Option(k.Name, k.Id);
//       }
//     }
//   };

//    // xứ lý khi thay đổi quận huyện thì sẽ hiển thị ra phường xã thuộc quận huyện đó
//   district.onchange = function () {
//     ward.length = 1;
//     const dataCity = data.filter((n) => n.Id === citis.value);
//     if (this.value != "") {
//       const dataWards = dataCity[0].Districts.filter(n => n.Id === this.value)[0].Wards;

//       for (const w of dataWards) {
//         wards.options[wards.options.length] = new Option(w.Name, w.Id);
//       }
//     }
//   };
// }
$(function () {
  apiProvince=(prodvince)=>{
      let district;
  
      prodvince.forEach(element => {
          $('#province').append(`<option value="${element.code}">${element.name}</option>`)
      });
      $('#province').change(function () {
          $('#district').html('<option value="-1">Chọn quận/huyện</option>')
          $('#town').html('<option value = "-1"> Chọn phường/xã </option>')
          let value = $(this).val();
          $.each(prodvince,function(index,element){
              if (element.code == value) {
                  district = element.districts;
                  $.each(element.districts,function(index,element1){
                      $('#district').append(`<option value="${element1.code}">${element1.name}</option>`)
                  })
                  
              }
          })         
      });    
      $('#district').change(function () {
          $('#town').html('<option value = "-1"> Chọn phường/xã </option>')
          let value = $(this).val();
          $.each(district,function(index,element){
              if (element.code == value) {
                  element.wards.forEach(element1 => {
                      $('#town').append(`<option value="${element1.code}">${element1.name}</option>`)
                  });
              }
          })       
      });
  }
  prodvince = JSON.parse(data);
   apiProvince(prodvince);
})
});
