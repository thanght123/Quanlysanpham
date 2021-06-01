var TONGTIEN = 0;

window.onload = function() {
    
    document.getElementById("btnDangXuat").onclick = function() {
        checkDangXuat(()=>{
            window.location.href = "loginQTV.php"
        });
    }

    getCurrentUser((user)=>{
        if(user != null) {
            if(user.MaQuyen == 3) {
                addEventChangeTab();
                addThongKe();
                openTab('Home');
                setupEventTaiKhoan();
            }
        } else {
            document.body.innerHTML = `<h1 style="color:red; with:100%; text-align:center; margin: 50px;"> Truy cập bị từ chối.. </h1>`;
        }
    }, (e)=> {
        document.body.innerHTML = `<h1 style="color:red; with:100%; text-align:center; margin: 50px;"> Truy cập bị từ chối.. </h1>`;
    });
}


function addChart(id, chartOption) {
    var ctx = document.getElementById(id).getContext('2d');
    var chart = new Chart(ctx, chartOption);
}

function addThongKe() {
    var dataChart = {
        type: 'bar',
        data: {
            labels: ["Adidas", "Bitis", "Converse", "Nike", "Puma", "Vans"],
            datasets: [{
                label: 'Số lượng bán ra',
                data: [12, 19, 10, 5, 20, 5],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            title: {
                fontColor: '#fff',
                fontSize: 25,
                display: true,
                text: 'Sản phẩm bán ra'
            }
        }
    };

    // Thêm thống kê
    var barChart = copyObject(dataChart);
    barChart.type = 'bar';
    addChart('myChart1', barChart);

    var doughnutChart = copyObject(dataChart);
    doughnutChart.type = 'doughnut';
    addChart('myChart2', doughnutChart);

    var pieChart = copyObject(dataChart);
    pieChart.type = 'pie';
    addChart('myChart3', pieChart);

    var lineChart = copyObject(dataChart);
    lineChart.type = 'line';
    addChart('myChart4', lineChart);
}


// ======================= Các Tab =========================
function addEventChangeTab() {
    var sidebar = document.getElementsByClassName('sidebar')[0];
    var list_a = sidebar.getElementsByTagName('a');
    for (var a of list_a) {
        if (!a.onclick) {
            a.addEventListener('click', function() {
                turnOff_Active();
                this.classList.add('active');
                var tab = this.childNodes[1].data.trim()
                openTab(tab);
            })
        }
    }
}

function turnOff_Active() {
    var sidebar = document.getElementsByClassName('sidebar')[0];
    var list_a = sidebar.getElementsByTagName('a');
    for (var a of list_a) {
        a.classList.remove('active');
    }
}

function openTab(nameTab) {
    // ẩn hết
    var main = document.getElementsByClassName('main')[0].children;
    for (var e of main) {
        e.style.display = 'none';
    }

    // mở tab
    switch (nameTab) {
        case 'Home':
            document.getElementsByClassName('home')[0].style.display = 'block';
            break;
        case 'Nhãn Hiệu':
            document.getElementsByClassName('nhanhieu')[0].style.display = 'block';
            break;
        case 'Nhân Viên':
            document.getElementsByClassName('nhanvien')[0].style.display = 'block';
            break;
        case 'Thống Kê':
            document.getElementsByClassName('thongke')[0].style.display = 'block';
            break;
    }
}

// ====================== Chi Nhánh =============================
// Vẽ bảng
function refreshTableChiNhanh() {
    $.ajax({
        type: "POST",
        url: "php/xulychinhanh.php",
        dataType: "json",
        // timeout: 1500, // sau 1.5 giây mà không phản hồi thì dừng => hiện lỗi
        data: {
            request: "getall",
        },
        success: function(data, status, xhr) {
            list_brands = data;
            addTableChiNhanh(data);
            //console.log(data);
        },
        error: function(e) {
            Swal.fire({
                type: "error",
                title: "Lỗi lấy dữ liệu chi nhánh (admin.js > refreshTableChiNhanh)",
                html: e.responseText
            });
        }
    });
}


function addTableChiNhanh(data) {
    var tc = document.getElementsByClassName('nhanhieu')[0].getElementsByClassName('table-content')[0];
    var s = `<table class="table-outline hideImg">`;


    for (var i = 0; i < data.length; i++) {
        var u = data[i];
        console.log(u.TrangThai)

        s += `<tr>
            <td style="width: 15%">` + (i + 1) + `</td>
            <td style="width: 30%">` + u.TenLSP + `</td>
            <td style="width: 35%">` + u.Mota + `</td>         
            <td style="width: 20%">
                <div class="tooltip">
                    <i class="fa fa-remove" onclick="xoaChiNhanh('` + u.MaLSP + `')"></i>
                    <span class="tooltiptext">Xóa</span>
                </div>
            </td>
        </tr>`;
    }

    s += `</table>`;
    tc.innerHTML = s;
}

// Thêm
function layThongTinNhanHieu() {
    var malsp = document.getElementById("manhThem").value;
    var name = document.getElementById("tennhThem").value;
    var img =  document.getElementById("hinhanh").value;
    var description = document.getElementById("mota").value;

    return {
        "malsp":malsp,
        "name": name,
        "img": img,
        "description": description
    };
}

//Thêm nhãn hiệu
function themNH() {
    var newLsp = layThongTinNhanHieu();
    $.ajax({
        type: "POST",
        url: "php/xulychinhanh.php",
        dataType: "json",
        // timeout: 1500, // sau 1.5 giây mà không phản hồi thì dừng => hiện lỗi
        data: {
            request: "add",
            dataAdd: newLsp
        },
        success: function(data, status, xhr) {
            console.log(data);
            Swal.fire({
                type: 'success',
                title: 'Thêm thành công'
            })
            document.getElementById('khungThemNH').style.transform = 'scale(0)';
            refreshTableChiNhanh();
        },
        error: function(e) {
            console.log(e.responseText);
            Swal.fire({
                type: "error",
                title: "Lỗi thêm nhãn hiệu",
            });
        }
    });

    

    alert('Thêm sản phẩm "' + newSp.name + '" thành công.');
    refreshTableSanPham();

}

// Cập nhật ảnh sản phẩm
function capNhatAnhNH(files, id, anh) {
    var url = '';
    if (files.length) url = window.URL.createObjectURL(files[0]);

    document.getElementById(id).src = url;
    var link = "img/company/" + files[0].name;
    document.getElementById('hinhanh').value = link;
}

// Tìm kiếm
function timKiemChiNhanh(inp) {
    var kieuTim = document.getElementsByName('kieuTimChiNhanh')[0].value;
    var text = inp.value;

    // Lọc
    var vitriKieuTim = {
        'ten': 1,
        'mota': 2,
    };

    var listTr_table = document.getElementsByClassName('nhanhieu')[0].getElementsByClassName('table-content')[0].getElementsByTagName('tr');
    for (var tr of listTr_table) {
        var td = tr.getElementsByTagName('td')[vitriKieuTim[kieuTim]].innerHTML.toLowerCase();

        if (td.indexOf(text.toLowerCase()) < 0) {
            tr.style.display = 'none';
        } else {
            tr.style.display = '';
        }
    }
}

function openThemChiNhanh() {
    window.alert('Not Available!');
}

// vô hiệu hóa người dùng (tạm dừng, không cho đăng nhập vào)
function voHieuHoaChiNhanh(TrangThai) {
    if (TrangThai == 1)
    {

    }
    var span = inp.parentElement.nextElementSibling;
    span.innerHTML = (inp.checked ? 'Khóa' : 'Mở');
}

// Xóa người dùng
function xoaChiNhanh(mand) { 
    Swal.fire({
        title: "Bạn có chắc muốn xóa?",
        type: "question",
        showCancelButton: true,
        cancelButtonText: "Hủy"
    }).then((result)=>{
        if(result.value) {
            $.ajax({
                type: "POST",
                url: "php/xulychinhanh.php",
                dataType: "json",
                // timeout: 1500, // sau 1.5 giây mà không phản hồi thì dừng => hiện lỗi
                data: {
                    request: "delete",
                    mand: mand
                },
                success: function(data, status, xhr) {
                    refreshTableChiNhanh();
                    //console.log(data);
                },
                error: function(e) {
                    // Swal.fire({
                    //     type: "error",
                    //     title: "Lỗi lấy dữ liệu khách Hàng (admin.js > refreshTableChiNhanh)",
                    //     html: e.responseText
                    // });
                    console.log(e.responseText);
                }
            });
        }
    })
}

// Sắp xếp
function sortChiNhanhTable(loai) {
    var list = document.getElementsByClassName('nhanvien')[0].getElementsByClassName("table-content")[0];
    var tr = list.getElementsByTagName('tr');

    quickSort(tr, 0, tr.length - 1, loai, getValueOfTypeInTable_ChiNhanh);
    decrease = !decrease;
}

function getValueOfTypeInTable_ChiNhanh(tr, loai) {
    var td = tr.getElementsByTagName('td');
    switch (loai) {
        case 'stt':
            return Number(td[0].innerHTML);
        case 'ten':
            return td[1].innerHTML.toLowerCase();
        case 'diachi':
            return td[2].innerHTML.toLowerCase();
    }
    return false;
}

function autoMaLSP() {
    // hàm tự tạo mã cho loại sản phẩm mới
    var autoMaSP = list_brands[list_brands.length-1].MaLSP;
    document.getElementById('manhThem').value = parseInt(autoMaSP)+1;
}


// ====================== Nhân Viên =============================
// Vẽ bảng
function refreshTableNhanVien() {
    $.ajax({
        type: "POST",
        url: "php/xulynhanvien.php",
        dataType: "json",
        // timeout: 1500, // sau 1.5 giây mà không phản hồi thì dừng => hiện lỗi
        data: {
            request: "getemployee",
        },
        success: function(data, status, xhr) {
            addTableNhanVien(data);
            //console.log(data);
        },
        error: function(e) {
            Swal.fire({
                type: "error",
                title: "Lỗi lấy dữ liệu nhân viên (admin.js > refreshTableNhanVien)",
                html: e.responseText
            });
        }
    });
}

function thayDoiTrangThaiND(inp, mand) {
    var trangthai = (inp.checked?1:0);  
    $.ajax({
        type: "POST",
        url: "php/xulynhanvien.php",
        dataType: "json",
        // timeout: 1500, // sau 1.5 giây mà không phản hồi thì dừng => hiện lỗi
        data: {
            request: "changeTT",
            key: mand,
            trangThai: trangthai
        },
        success: function(data, status, xhr) {
            //list_products = data; // biến toàn cục lưu trữ mảng sản phẩm hiện có
            // refreshTableNhanVien();
            //console.log(data);
        },
        error: function(e) {
            // Swal.fire({
            //     type: "error",
            //     title: "Lỗi lấy dữ liệu nhân viên (admin.js > refreshTableNhanVien)",
            //     html: e.responseText
            // });
            console.log(e.responseText);
        }
    });
}


function addTableNhanVien(data) {
    var tc = document.getElementsByClassName('nhanvien')[0].getElementsByClassName('table-content')[0];
    var s = `<table class="table-outline hideImg">`;


    for (var i = 0; i < data.length; i++) {
        var u = data[i];
        s += `<tr>
            <td style="width: 10%">` + (i + 1) + `</td>
            <td style="width: 25%">` + u.Ho + ' ' + u.Ten + `</td>
            <td style="width: 30%">` + u.Email + `</td>
            <td style="width: 20%">` + u.TaiKhoan + `</td>           
            <td style="width: 15%">
                <div class="tooltip">
                    <label class="switch">
                        <input type="checkbox" `+(u.TrangThai==1?"checked":"")+` onclick="thayDoiTrangThaiND(this, '`+u.MaND+`')">
                        <span class="slider round"></span>
                    </label>
                    <span class="tooltiptext">` + (u.TrangThai ?    'Mở' : 'Khóa') + `</span>
                </div>
                <div class="tooltip">
                    <i class="fa fa-remove" onclick="xoaNV('` + u.MaND + `')"></i>
                    <span class="tooltiptext">Xóa</span>
                </div>
            </td>
        </tr>`;
    }

    s += `</table>`;
    tc.innerHTML = s;
}

// Tìm kiếm
function timKiemNguoiDung(inp) {
    var kieuTim = document.getElementsByName('kieuTimNhanVien')[0].value;
    var text = inp.value;

    // Lọc
    var vitriKieuTim = {
        'ten': 1,
        'email': 2,
        'taikhoan': 3
    };

    var listTr_table = document.getElementsByClassName('nhanvien')[0].getElementsByClassName('table-content')[0].getElementsByTagName('tr');
    for (var tr of listTr_table) {
        var td = tr.getElementsByTagName('td')[vitriKieuTim[kieuTim]].innerHTML.toLowerCase();

        if (td.indexOf(text.toLowerCase()) < 0) {
            tr.style.display = 'none';
        } else {
            tr.style.display = '';
        }
    }
}

function openThemNguoiDung() {
    window.alert('Not Available!');
}

// vô hiệu hóa người dùng (tạm dừng, không cho đăng nhập vào)
function voHieuHoaNguoiDung(TrangThai) {
    if (TrangThai == 1)
    {

    }
    var span = inp.parentElement.nextElementSibling;
    span.innerHTML = (inp.checked ? 'Khóa' : 'Mở');
}

// Xóa người dùng
function xoaNV(mand) { 
    Swal.fire({
        title: "Bạn có chắc muốn xóa?",
        type: "question",
        showCancelButton: true,
        cancelButtonText: "Hủy"
    }).then((result)=>{
        if(result.value) {
            $.ajax({
                type: "POST",
                url: "php/xulynhanvien.php",
                dataType: "json",
                data: {
                    request: "delete",
                    mand: mand
                },
                success: function(data, status, xhr) {
                    refreshTableNhanVien();
                },
                error: function(e) {
                    console.log(e.responseText);
                }
            });
        }
    })
}

// Sắp xếp
function sortNhanVienTable(loai) {
    var list = document.getElementsByClassName('nhanvien')[0].getElementsByClassName("table-content")[0];
    var tr = list.getElementsByTagName('tr');

    quickSort(tr, 0, tr.length - 1, loai, getValueOfTypeInTable_NhanVien);
    decrease = !decrease;
}

function getValueOfTypeInTable_NhanVien(tr, loai) {
    var td = tr.getElementsByTagName('td');
    switch (loai) {
        case 'stt':
            return Number(td[0].innerHTML);
        case 'hoten':
            return td[1].innerHTML.toLowerCase();
        case 'email':
            return td[2].innerHTML.toLowerCase();
        case 'taikhoan':
            return td[3].innerHTML.toLowerCase();
        case 'matkhau':
            return td[4].innerHTML.toLowerCase();
    }
    return false;
}

// ================== Sort ====================
// https://github.com/HoangTran0410/First_html_css_js/blob/master/sketch.js
var decrease = true; // Sắp xếp giảm dần

// loại là tên cột, func là hàm giúp lấy giá trị từ cột loai
function quickSort(arr, left, right, loai, func) {
    var pivot,
        partitionIndex;

    if (left < right) {
        pivot = right;
        partitionIndex = partition(arr, pivot, left, right, loai, func);

        //sort left and right
        quickSort(arr, left, partitionIndex - 1, loai, func);
        quickSort(arr, partitionIndex + 1, right, loai, func);
    }
    return arr;
}

function partition(arr, pivot, left, right, loai, func) {
    var pivotValue = func(arr[pivot], loai),
        partitionIndex = left;

    for (var i = left; i < right; i++) {
        if (decrease && func(arr[i], loai) > pivotValue ||
            !decrease && func(arr[i], loai) < pivotValue) {
            swap(arr, i, partitionIndex);
            partitionIndex++;
        }
    }
    swap(arr, right, partitionIndex);
    return partitionIndex;
}

function swap(arr, i, j) {
    var tempi = arr[i].cloneNode(true);
    var tempj = arr[j].cloneNode(true);
    arr[i].parentNode.replaceChild(tempj, arr[i]);
    arr[j].parentNode.replaceChild(tempi, arr[j]);
}

//Thêm nhân viên
function checkThemNV() {
    var ho = document.getElementById('ho').value;
    var ten = document.getElementById('ten').value;
    var gt = document.getElementById('gioitinh').value;
    var sdt = document.getElementById('sdt').value;
    var email = document.getElementById('email').value;
    var diachi = document.getElementById('diachi').value;
    var username = document.getElementById('newUser').value;
    var pass = document.getElementById('newPass').value;
    
    $.ajax({
        url: "php/xulytaikhoan.php",
        type: "POST",
        dataType: "json",
        timeout: 1500,
        data: {
            request: 'themNV',
            data_ho: ho,
            data_ten: ten,
            data_gt: gt,
            data_sdt: sdt,
            data_email: email,
            data_diachi: diachi,
            data_newUser: username,
            data_newPass: pass,
        },
        success: function(data, status, xhr) {
            Swal.fire({
                type: 'success',
                title: 'Thêm nhân viên thành công ',
                confirmButtonText: 'Tuyệt'

            });
        },
        error: function(e) {
            console.log(e.responseText)
        }
    });
    refreshTableNhanVien();
    showTaiKhoan(false);
    return false;
}

// Tạo event, hiệu ứng cho form tài khoản
function setupEventTaiKhoan() {
    var taikhoan = document.getElementsByClassName('taikhoan')[0];
    var list = taikhoan.getElementsByTagName('input');

    // Tạo eventlistener cho input để tạo hiệu ứng label
    // Gồm 2 event onblur, onfocus được áp dụng cho từng input trong list bên trên
    ['blur', 'focus'].forEach(function(evt) {
        for (var i = 0; i < list.length; i++) {
            list[i].addEventListener(evt, function(e) {
                var label = this.previousElementSibling; // lấy element ĐỨNG TRƯỚC this, this ở đây là input
                if (e.type === 'blur') { // khi ấn chuột ra ngoài
                    if (this.value === '') { // không có value trong input thì đưa label lại như cũ
                        label.classList.remove('active');
                        label.classList.remove('highlight');
                    } else { // nếu có chữ thì chỉ tắt hightlight chứ không tắt active, active là dịch chuyển lên trên
                        label.classList.remove('highlight');
                    }
                } else if (e.type === 'focus') { // khi focus thì label active + hightlight
                    label.classList.add('active');
                    label.classList.add('highlight');
                }
            });
        }
    })

    // Event chuyển tab login-signup
    var tab = document.getElementsByClassName('tab');
    for (var i = 0; i < tab.length; i++) {
        var a = tab[i].getElementsByTagName('a')[0];
        a.addEventListener('click', function(e) {
            e.preventDefault(); // tắt event mặc định

            // Thêm active(màu xanh lá) cho li chứa tag a này => ấn login thì login xanh, signup thì signup sẽ xanh
            this.parentElement.classList.add('active');

            // Sau khi active login thì phải tắt active sigup và ngược lại
            // Trường hợp a này thuộc login => <li>Login</li> sẽ có nextElement là <li>SignUp</li>
            if (this.parentElement.nextElementSibling) {
                this.parentElement.nextElementSibling.classList.remove('active');
            }
            // Trường hợp a này thuộc signup => <li>SignUp</li> sẽ có .previousElement là <li>Login</li>
            if (this.parentElement.previousElementSibling) {
                this.parentElement.previousElementSibling.classList.remove('active');
            }

            // Ẩn phần nhập của login nếu ấn signup và ngược lại
            // href của 2 tab signup và login là #signup và #login -> tiện cho việc getElement dưới đây
            var target = this.href.split('#')[1];
            document.getElementById(target).style.display = 'block';

            var hide = (target == 'login' ? 'signup' : 'login');
            document.getElementById(hide).style.display = 'none';
        })
    }

    // Đoạn code tạo event trên được chuyển về js thuần từ code jquery
    // Code jquery cho phần tài khoản được lưu ở cuối file này
}
// ================= các hàm thêm ====================
// Hiển thị form tài khoản, giá trị truyền vào là true hoặc false
function showTaiKhoan(show) {
    var value = (show ? "scale(1)" : "scale(0)");
    var div = document.getElementsByClassName('containTaikhoan')[0];
    div.style.transform = value;
}
// Hiển thị form tài khoản, giá trị truyền vào là true hoặc false
function showNhanHieu(show) {
    var value = (show ? "scale(1)" : "scale(0)");
    var div = document.getElementById('khungthemNH')[0];
    div.style.transform = value;
}