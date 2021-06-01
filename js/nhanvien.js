var TONGTIEN = 0;

window.onload = function() {

    document.getElementById("btnDangXuat").onclick = function() {
        checkDangXuat(()=>{
            window.location.href = "loginNV.php"
        });
    }

    getCurrentUser((user)=>{
        if(user != null) {
            if(user.MaQuyen == 2) {
                addEventChangeTab();
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

function refreshTableSanPham() {
    $.ajax({
        type: "POST",
        url: "php/xulysanpham.php",
        dataType: "json",
        // timeout: 1500, // sau 1.5 giây mà không phản hồi thì dừng => hiện lỗi
        data: {
            request: "getall",
        },
        success: function(data, status, xhr) {
            list_products = data; // biến toàn cục lưu trữ mảng sản phẩm hiện có
            addTableProducts(data);
        },
        error: function(e) {
            Swal.fire({
                type: "error",
                title: "Lỗi lấy dữ liệu sản phẩm (admin.js > refreshTableSanPham)",
                html: e.responseText
            });
            console.log(e.responseText)
        }
    });
}

function ajaxLoaiSanPham() {
    $.ajax({
        type: "POST",
        url: "php/xulyloaisanpham.php",
        dataType: "json",
        // timeout: 1500, // sau 1.5 giây mà không phản hồi thì dừng => hiện lỗi
        data: {
            request: "getall"
        },
        success: function(data, status, xhr) {
            showLoaiSanPham(data);
        },
        error: function(e) {

        }
    });
}

function showLoaiSanPham(data) {
    var s="";
    for (var i = 0; i < data.length; i++) {
            var p = data[i];
                s +=`<option value="` + p.MaLSP + `">` + p.TenLSP + `</option>`;
        }
    document.getElementsByName("chonCompany")[0].innerHTML = s;
}

function ajaxKhuyenMai() {
    $.ajax({
        type: "POST",
        url: "php/xulykhuyenmai.php",
        dataType: "json",
        // timeout: 1500, // sau 1.5 giây mà không phản hồi thì dừng => hiện lỗi
        data: {
            request: "getall"
        },
        success: function(data, status, xhr) {
            showKhuyenMai(data);
            showGTKM(data);
        },
        error: function(e) {

        }
    });
}

function showKhuyenMai(data) {
    var s=`
        <option selected="selected" value="`+data[0].MaKM+`">Không</option>
        <option value="`+data[1].MaKM+`">Giảm giá</option>
        <option value="`+data[2].MaKM+`">Giá rẻ online</option>
        <option value="`+data[3].MaKM+`">Mởi ra mắt</option>`;
    document.getElementsByName("chonKhuyenMai")[0].innerHTML = s;

}

function showGTKM() {
    var giaTri = document.getElementsByName("chonKhuyenMai")[0].value;
    switch (giaTri) {
        // lấy tất cả khuyến mãi
        case '1':
                document.getElementById("giatrikm").value = 0;
            break;

        case '2':
                document.getElementById("giatrikm").value = 50000;
            break;

        default:
            break;
    }
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
        case 'Sản Phẩm':
            document.getElementsByClassName('sanpham')[0].style.display = 'block';
            break;
        case 'Đơn Hàng':
            document.getElementsByClassName('donhang')[0].style.display = 'block';
            break;
        case 'Khách Hàng':
            document.getElementsByClassName('khachhang')[0].style.display = 'block';
            break;
    }
}

// ========================== Sản Phẩm ========================
// Vẽ bảng danh sách sản phẩm
function addTableProducts(list_products) {
    var tc = document.getElementsByClassName('sanpham')[0].getElementsByClassName('table-content')[0];
    var s = `<table class="table-outline hideImg">`;

    for (var i = 0; i < list_products.length; i++) {
        var p = list_products[i];
        s += `<tr>
            <td style="width: 5%">` + (i + 1) + `</td>
            <td style="width: 10%">` + p.MaSP + `</td>
            <td style="width: 40%">
                <a title="Xem chi tiết" target="_blank" href="chitietsanpham.php?` + p.MaSP.toString() + `">` + p.TenSP + `</a>
                <img src="` + p.HinhAnh + `"></img>
            </td>
            <td style="width: 15%">` + parseInt(p.DonGia).toLocaleString() + `</td>
            <td style="width: 10%">` + /*promoToStringValue(*/ (p.KM.TenKM) /*)*/ + `</td>
            <td style="width: 10%">` + (p.TrangThai==1?"Hiện":"Ẩn") + `</td>
            <td style="width: 10%">
                <div class="tooltip">
                    <i class="fa fa-wrench" onclick="addKhungSuaSanPham('` + p.MaSP + `')"></i>
                    <span class="tooltiptext">Sửa</span>
                </div>
                <div class="tooltip">
                    <i class="fa fa-trash" onclick="xoaSanPham('` + p.TrangThai + `', '` + p.MaSP + `', '` + p.TenSP + `')"></i>
                    <span class="tooltiptext">Xóa</span>
                </div>
            </td>
        </tr>`;
    }

    s += `</table>`;

    tc.innerHTML = s;
}

// Tìm kiếm
function timKiemSanPham(inp) {
    var kieuTim = document.getElementsByName('kieuTimSanPham')[0].value;
    var text = inp.value;

    // Lọc
    var vitriKieuTim = {
        'ma': 1,
        'ten': 2
    }; // mảng lưu vị trí cột

    var listTr_table = document.getElementsByClassName('sanpham')[0].getElementsByClassName('table-content')[0].getElementsByTagName('tr');
    for (var tr of listTr_table) {
        var td = tr.getElementsByTagName('td')[vitriKieuTim[kieuTim]].innerHTML.toLowerCase();

        if (td.indexOf(text.toLowerCase()) < 0) {
            tr.style.display = 'none';
        } else {
            tr.style.display = '';
        }
    }
}

// Thêm
function layThongTinSanPhamTuTable(id) {
    var khung = document.getElementById(id);
    var tr = khung.getElementsByTagName('tr');

    var masp = tr[1].getElementsByTagName('td')[1].getElementsByTagName('input')[0].value;
    var name = tr[2].getElementsByTagName('td')[1].getElementsByTagName('input')[0].value;
    var company = tr[3].getElementsByTagName('td')[1].getElementsByTagName('select')[0].value;
    var img =  document.getElementById("hinhanh").value;
    var price = tr[5].getElementsByTagName('td')[1].getElementsByTagName('input')[0].value;
    var amount = tr[6].getElementsByTagName('td')[1].getElementsByTagName('input')[0].value;
    var star = tr[7].getElementsByTagName('td')[1].getElementsByTagName('input')[0].value;
    var rateCount = tr[8].getElementsByTagName('td')[1].getElementsByTagName('input')[0].value;
    var promoName = tr[9].getElementsByTagName('td')[1].getElementsByTagName('select')[0].value;
    var promoValue = tr[10].getElementsByTagName('td')[1].getElementsByTagName('input')[0].value;
    var description = tr[11].getElementsByTagName('td')[1].getElementsByTagName('input')[0].value;

    return {
        "name": name,
        "img": img,
        "price": price,
        "company": company,
        "amount": amount,
        "star": star,
        "rateCount": rateCount,
        "promo": {
            "name": promoName,
            "value": promoValue
        },
        "description": description,
        "masp": masp,
        "TrangThai": 1
    };
}

function themSanPham() {
    var newSp = layThongTinSanPhamTuTable('khungThemSanPham');

    //kt tên sp
    var pattCheckTenSP = /([a-z A-Z0-9&():.'_-]{2,})$/;
    if (pattCheckTenSP.test(newSp.name) == false)
    {
        alert ("Tên sản phẩm không hợp lệ");
        return false;
    }

    //kt giá tiền
    var pattCheckGia = /^([0-9]){1,}(000)$/;
    if (pattCheckGia.test(newSp.price) == false)
    {
        alert ("Đơn giá sản phẩm không hợp lệ");
        return false;
    }

    //kt số lượng
    var pattCheckSL = /[0-9]{1,}$/;
    if (pattCheckSL.test(newSp.amount) == false)
    {
        alert ("Số lượng sản phẩm không hợp lệ");
        return false;
    }

    $.ajax({
        type: "POST",
        url: "php/xulysanpham.php",
        dataType: "json",
        // timeout: 1500, // sau 1.5 giây mà không phản hồi thì dừng => hiện lỗi
        data: {
            request: "add",
            dataAdd: newSp
        },
        success: function(data, status, xhr) {
            Swal.fire({
                type: 'success',
                title: 'Thêm thành công'
            })
            resetForm();
            document.getElementById('khungThemSanPham').style.transform = 'scale(0)';
            refreshTableSanPham();
        },
        error: function(e) {
            Swal.fire({
                type: "error",
                title: "Lỗi thêm sản phẩm",
                html: e.responseText
            });
        }
    });

}
function resetForm() {
    var khung = document.getElementById('khungThemSanPham');
    var tr = khung.getElementsByTagName('tr');

    tr[2].getElementsByTagName('td')[1].getElementsByTagName('input')[0].value = "";
    tr[4].getElementsByTagName('td')[1].getElementsByTagName('img')[0].src = "";
    tr[5].getElementsByTagName('td')[1].getElementsByTagName('input')[0].value = "";
    tr[6].getElementsByTagName('td')[1].getElementsByTagName('input')[0].value = "0";
    tr[12].getElementsByTagName('td')[1].getElementsByTagName('input')[0].value ="";
}

function autoMaSanPham(company) {
    // hàm tự tạo mã cho sản phẩm mới
    var autoMaSP = list_products[list_products.length-1].MaSP;
    document.getElementById('maspThem').value = parseInt(autoMaSP)+1;
}

// Xóa
function xoaSanPham(trangthai, masp, tensp) {
    if (trangthai == 1)
    {
        // alert ("Sản phẩm còn đang bán");
        Swal.fire({
            type: 'warning',
            title: 'Bạn có muốn ẨN ' + tensp + ' không!',
            showCancelButton: true
        }).then((result) => {
            if(result.value) {
                $.ajax({
                    type: "POST",
                    url: "php/xulysanpham.php",
                    dataType: "json",
                    // timeout: 1500, // sau 1.5 giây mà không phản hồi thì dừng => hiện lỗi
                    data: {
                        request: "hide",
                        id: masp,
                        trangthai: 0
                    },
                    success: function(data, status, xhr) {
                        Swal.fire({
                            type: 'success',
                            title: 'Ẩn thành công'
                        })
                        refreshTableSanPham();
                    },
                    error: function(e) {
                        Swal.fire({
                            type: "error",
                            title: "Lỗi xóa",
                            html: e.responseText
                        });
                    }
                });
            }
        })
    }
    else
    {
        if (window.confirm('Bạn có chắc muốn xóa ' + tensp)) {
            // Xóa
            $.ajax({
                type: "POST",
                url: "php/xulysanpham.php",
                dataType: "json",
                // timeout: 1500, // sau 1.5 giây mà không phản hồi thì dừng => hiện lỗi
                data: {
                    request: "delete",
                    maspdelete: masp
                },
                success: function(data, status, xhr) {
                    
                },
                error: function() {
                    Swal.fire({
                        type: "error",
                        title: "Lỗi xóa"
                    });
                }
            });

            // Vẽ lại table 
            refreshTableSanPham();
        }
    }
}

function addKhungSuaSanPham(masp) {
    var sp;
    for (var p of list_products) {
        if (p.MaSP == masp) {
            sp = p;
        }
    }
    var s = `<span class="close" onclick="this.parentElement.style.transform = 'scale(0)';">&times;</span>
    <form method="post" action="" enctype="multipart/form-data" onsubmit="return suaSanPham()">
        <table class="overlayTable table-outline table-content table-header">
            <tr>
                <th colspan="2">` + sp.TenSP + `</th>
            </tr>
            <tr>
                <td>Mã giày:</td>
                <td><input disabled="disabled" type="text" id="maspSua" name="maspSua" value="` + sp.MaSP + `"></td>
            </tr>
            <tr>
                <td>Tên giày:</td>
                <td><input type="text" value="` + sp.TenSP + `"></td>
            </tr>
            <tr>
                <td>Thương hiệu:</td>
                <td>
                    <select name="chonCompany" onchange="autoMaSanPham(this.value)">`

                    var company = ["Adidas", "Bitit", "Converse", "Nike", "Puma", "Vans"];
                    var i = 1;
                    for (var c of company) {
                        var masp = i++;
                        if (sp.MaLSP == masp)
                            s += (`<option value="` + sp.MaLSP + `" selected="selected">` + c + `</option>`);
                        else s += (`<option value="` + masp + `">` + c + `</option>`);
                    }
                    s+=`</select>
                </td>
            </tr>
            <?php
                $tenfilemoi= "";
                if (isset($_POST["submit"]))
                {
                    if (($_FILES["hinhanh"]["type"]=="image/jpeg") ||($_FILES["hinhanh"]["type"]=="image/png") || ($_FILES["hinhanh"]["type"]=="image/jpg") && ($_FILES["hinhanh"]["size"] < 50000) )
                    {
                        if ($_FILES["file"]["error"] > 0 || file_exists("img/products/" . basename($_FILES["hinhanh"]["name"]))) 
                        {
                            echo ("Error Code: " . $_FILES["file"]["error"] . "<br />Chỉnh sửa ảnh lại sau)");
                        }
                        else
                        {
                            /*$tmp = explode(".", $_FILES["hinhanh"]["name"]);
                            $duoifile = end($tmp);
                            $masp = $_POST['maspThem'];
                            $tenfilemoi = $masp . "." . $duoifile;*/
                            $file = $_FILES["hinhanh"]["name"];
                            $tenfilemoi = "img/products/" .$_FILES["hinhanh"]["name"];
                            move_uploaded_file( $_FILES["hinhanh"]["tmp_name"], $tenfilemoi);
                        }
                    }
                }
            ?>
            <tr>
                <td>Hình:</td>
                <td>
                    <img class="hinhDaiDien" id="anhDaiDienSanPhamThem" src="">
                    <input type="file" name="hinhanh" value="` + (sp.HinhAnh).toString().split("/")[2] + `" onchange="capNhatAnhSanPham(this.files, 'anhDaiDienSanPhamThem', '<?php echo $tenfilemoi; ?>')">
                    <input style="display: none;" type="text" id="hinhanh" value="` + (sp.HinhAnh).toString().split("/")[2] + `">
                </td>
            </tr>
            <tr>
                <td>Giá tiền:</td>
                <td><input type="text" value="` + sp.DonGia + `"></td>
            </tr>
            <tr>
                <td>Số lượng:</td>
                <td><input type="text" value="` + sp.SoLuong + `"></td>
            </tr>
            <tr>
                <td>Số sao:</td>
                <td><input type="text" disabled="disabled" value="` + sp.SoSao + `"></td>
            </tr>
            <tr>
                <td>Đánh giá:</td>
                <td><input type="text" disabled="disabled" value="` + sp.SoDanhGia + `"></td>
            </tr>
            <tr>
                <td>Khuyến mãi:</td>
                <td>
                    <select name="chonKhuyenMai" onchange="showGTKM()">`
                            var i = 1;
                            s += (`<option selected="selected" value="` + i++ + `">Không</option>`);
                            s += (`<option value="` + i++ + `">Giảm giá</option>`);
                            s += (`<option value="` + i++ + `">Giá rẻ online</option>`);
                            s += (`<option value="` + i++ + `">Mới ra mắt</option>`);
                        s+=`</script>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Giá trị khuyến mãi:</td>
                <td><input id="giatrikm" type="text" value="0"></td>
            </tr>
            <tr>
                <td>Mô tả:</td>
                <td><input type="text" value="` + sp.MoTa + `"></td>
            </tr>
            <tr>
                <td colspan="2"  class="table-footer"> <button name="submit">SỬA</button> </td>
            </tr>
        </table>`

    var khung = document.getElementById('khungSuaSanPham');
    khung.innerHTML = s;
    khung.style.transform = 'scale(1)';
}

function suaSanPham() {
    var editSp = layThongTinSanPhamTuTable('khungSuaSanPham');

    //kt tên sp
    var pattCheckTenSP = /([a-z A-Z0-9&():.'_-]{2,})$/;
    if (pattCheckTenSP.test(editSp.name) == false)
    {
        alert ("Tên sản phẩm không hợp lệ");
        return false;
    }

    //kt giá tiền
    var pattCheckGia = /^([0-9]){1,}(000)$/;
    if (pattCheckGia.test(editSp.price) == false)
    {
        alert ("Đơn giá sản phẩm không hợp lệ");
        return false;
    }

    $.ajax({
        type: "POST",
        url: "php/xulysanpham.php",
        dataType: "json",
        // timeout: 1500, // sau 1.5 giây mà không phản hồi thì dừng => hiện lỗi
        data: {
            request: "edit",
            dataEdit: editSp
        },
        success: function(data, status, xhr) {
            Swal.fire({
                type: 'success',
                title: 'Sửa thành công'
            })
            resetForm();
            document.getElementById('khungSuaSanPham').style.transform = 'scale(0)';
            refreshTableSanPham();
        },
        error: function(e) {
            Swal.fire({
                type: "error",
                title: "Lỗi sửa sản phẩm",
                html: e.responseText
            });
        }
    });

    

    alert('Thêm sản phẩm "' + newSp.name + '" thành công.');
    refreshTableSanPham();

}

// Cập nhật ảnh sản phẩm
function capNhatAnhSanPham(files, id, anh) {
    var url = '';
    if (files.length) url = window.URL.createObjectURL(files[0]);

    document.getElementById(id).src = url;
    document.getElementById('hinhanh').value = "img/products/" + files[0].name;
}

// Sắp Xếp sản phẩm
function sortProductsTable(loai) {
    var list = document.getElementsByClassName('sanpham')[0].getElementsByClassName("table-content")[0];
    var tr = list.getElementsByTagName('tr');

    quickSort(tr, 0, tr.length - 1, loai, getValueOfTypeInTable_SanPham); // type cho phép lựa chọn sort theo mã hoặc tên hoặc giá ... 
    decrease = !decrease;
}

// Lấy giá trị của loại(cột) dữ liệu nào đó trong bảng
function getValueOfTypeInTable_SanPham(tr, loai) {
    var td = tr.getElementsByTagName('td');
    switch (loai) {
        case 'stt':
            return Number(td[0].innerHTML);
        case 'masp':
            return Number(td[1].innerHTML);
        case 'ten':
            return td[2].innerHTML.toLowerCase();
        case 'gia':
            return stringToNum(td[3].innerHTML);
        case 'khuyenmai':
            return td[4].innerHTML.toLowerCase();
    }
    return false;
}

// ========================= Đơn Hàng ===========================
// Vẽ bảng

function refreshTableDonHang() {
    $.ajax({
        type: "POST",
        url: "php/xulydonhang.php",
        dataType: "json",
        // timeout: 1500, // sau 1.5 giây mà không phản hồi thì dừng => hiện lỗi
        data: {
            request: "getall",
        },
        success: function(data, status, xhr) {
            addTableDonHang(data);
            console.log(data);
        },
        error: function(e) {
            Swal.fire({
                type: "error",
                title: "Lỗi lấy dữ liệu khách Hàng (admin.js > refreshTableKhachHang)",
                html: e.responseText
            });
        }
    });
}
function addTableDonHang(data) {
    var tc = document.getElementsByClassName('donhang')[0].getElementsByClassName('table-content')[0];
    var s = `<table class="table-outline hideImg">`;

    TONGTIEN = 0;
    for (var i = 0; i < data.length; i++) {
        var d = data[i];
        s += `<tr>
            <td style="width: 5%">` + (i + 1) + `</td>
            <td style="width: 13%">` + d.MaHD + `</td>
            <td style="width: 7%">` + d.MaND + `</td>
            <td style="width: 20%">` + d.NguoiNhan + `</td>
            <td style="width: 15%">` + parseInt(d.TongTien).toLocaleString() + `</td>
            <td style="width: 10%">` + d.NgayLap + `</td>
            <td style="width: 10%">` + d.TrangThai + `</td>
            <td style="width: 10%">
                <div class="tooltip">
                    <i class="fa fa-check" onclick="trangThaiGiaoHang('` + d.TrangThai + `', '` + d.MaHD + `')"></i> 
                    <span class="tooltiptext">Giao</span>
                </div>
                <div class="tooltip">
                    <i class="fa fa-remove" onclick="trangThaiHoanGiaoHang('` + d.TrangThai + `', '` + d.MaHD + `')"></i>
                    <span class="tooltiptext">Hoãn</span>
                </div>
                
            </td>
        </tr>`;
        //TONGTIEN += stringToNum(d.tongtien);
        //<input type="checkbox" `+(u.TrangThai==1?"checked":"")+` onclick="thayDoiTrangThaiND(this, '`+u.MaND+`')">
    }

    s += `</table>`;
    tc.innerHTML = s;
}

function getListDonHang() {
    var u = getListUser();
    var result = [];
    for (var i = 0; i < u.length; i++) {
        for (var j = 0; j < u[i].donhang.length; j++) {
            // Tổng tiền
            var tongtien = 0;
            for (var s of u[i].donhang[j].sp) {
                var timsp = timKiemTheoMa(list_products, s.ma);
                if (timsp.MaKM.name == 'giareonline') tongtien += stringToNum(timsp.MaKM.value);
                else tongtien += stringToNum(timsp.DonGia);
            }

            // Ngày giờ
            var x = new Date(u[i].donhang[j].ngaymua).toLocaleString();

            // Các sản phẩm
            var sps = '';
            for (var s of u[i].donhang[j].sp) {
                sps += `<p style="text-align: right">` + (timKiemTheoMa(list_products, s.ma).name + ' [' + s.soluong + ']') + `</p>`;
            }

            // Lưu vào result
            result.push({
                "ma": u[i].donhang[j].ngaymua.toString(),
                "khach": u[i].username,
                "sp": sps,
                "tongtien": numToString(tongtien),
                "ngaygio": x,
                "tinhTrang": u[i].donhang[j].tinhTrang
            });
        }
    }
    return result;
}

function locDonHangTheoKhoangNgay() {
    var from = document.getElementById('fromDate').valueAsDate;
    var to = document.getElementById('toDate').valueAsDate;

    var listTr_table = document.getElementsByClassName('donhang')[0].getElementsByClassName('table-content')[0].getElementsByTagName('tr');
    for (var tr of listTr_table) {
        var td = tr.getElementsByTagName('td')[5].innerHTML;
        var d = new Date(td);

        if (d >= from && d <= to) {
            tr.style.display = '';
        } else {
            tr.style.display = 'none';
        }
    }
}

function timKiemDonHang(inp) {
    var kieuTim = document.getElementsByName('kieuTimDonHang')[0].value;
    var text = inp.value;

    // Lọc
    var vitriKieuTim = {
        'ma': 1,
        'khachhang': 2,
        'trangThai': 6
    };

    var listTr_table = document.getElementsByClassName('donhang')[0].getElementsByClassName('table-content')[0].getElementsByTagName('tr');
    for (var tr of listTr_table) {
        var td = tr.getElementsByTagName('td')[vitriKieuTim[kieuTim]].innerHTML.toLowerCase();

        if (td.indexOf(text.toLowerCase()) < 0) {
            tr.style.display = 'none';
        } else {
            tr.style.display = '';
        }
    }
}

function trangThaiGiaoHang(tt, madh) {
    if(parseInt(tt)==0){
        $.ajax({
            type: "POST",
            url: "php/xulydonhang.php",
            dataType: "json",
            // timeout: 1500, // sau 1.5 giây mà không phản hồi thì dừng => hiện lỗi
            data: {
                request: "changeTT",
                key: madh,
                trangThai: 1
            },
            success: function(data, status, xhr) {
                refreshTableDonHang();
            },
            error: function(e) {
                console.log(e.responseText);
            }
        });
    }
    else{
        alert("Đơn hàng đã ở trạng thái giao hàng");
    }
}

function trangThaiHoanGiaoHang(tt, madh) {
    if(parseInt(tt)==1){
        $.ajax({
            type: "POST",
            url: "php/xulydonhang.php",
            dataType: "json",
            // timeout: 1500, // sau 1.5 giây mà không phản hồi thì dừng => hiện lỗi
            data: {
                request: "changeTT",
                key: madh,
                trangThai: 0
            },
            success: function(data, status, xhr) {
                refreshTableDonHang();
            },
            error: function(e) {
                console.log(e.responseText);
            }
        });
    }
    else{
        alert("Đơn hàng đã ở trạng thái hoãn giao hàng");
    }
}

// Sắp xếp
function sortDonHangTable(loai) {
    var list = document.getElementsByClassName('donhang')[0].getElementsByClassName("table-content")[0];
    var tr = list.getElementsByTagName('tr');

    quickSort(tr, 0, tr.length - 1, loai, getValueOfTypeInTable_DonHang);
    decrease = !decrease;
}

// Lấy giá trị của loại(cột) dữ liệu nào đó trong bảng
function getValueOfTypeInTable_DonHang(tr, loai) {
    var td = tr.getElementsByTagName('td');
    switch (loai) {
        case 'stt':
            return Number(td[0].innerHTML);
        case 'ma':
            return new Date(td[1].innerHTML); // chuyển về dạng ngày để so sánh ngày
        case 'khach':
            return td[2].innerHTML.toLowerCase(); // lấy tên khách
        case 'sanpham':
            return td[3].children.length; // lấy số lượng hàng trong đơn này, length ở đây là số lượng <p>
        case 'tongtien':
            return stringToNum(td[4].innerHTML); // trả về dạng giá tiền
        case 'ngaygio':
            return new Date(td[5].innerHTML); // chuyển về ngày
        case 'trangthai':
            return td[6].innerHTML.toLowerCase(); //
    }
    return false;
}

// ====================== Khách Hàng =============================
// Vẽ bảng
function refreshTableKhachHang() {
    $.ajax({
        type: "POST",
        url: "php/xulykhachhang.php",
        dataType: "json",
        // timeout: 1500, // sau 1.5 giây mà không phản hồi thì dừng => hiện lỗi
        data: {
            request: "getall",
        },
        success: function(data, status, xhr) {
            addTableKhachHang(data);
        },
        error: function(e) {
            Swal.fire({
                type: "error",
                title: "Lỗi lấy dữ liệu khách Hàng (admin.js > refreshTableKhachHang)",
                html: e.responseText
            });
        }
    });
}

function thayDoiTrangThaiND(inp, mand) {
    var trangthai = (inp.checked?1:0);  
    $.ajax({
        type: "POST",
        url: "php/xulykhachhang.php",
        dataType: "json",
        // timeout: 1500, // sau 1.5 giây mà không phản hồi thì dừng => hiện lỗi
        data: {
            request: "changeTT",
            key: mand,
            trangThai: trangthai
        },
        success: function(data, status, xhr) {
        },
        error: function(e) {
            console.log(e.responseText);
        }
    });
}


function addTableKhachHang(data) {
    var tc = document.getElementsByClassName('khachhang')[0].getElementsByClassName('table-content')[0];
    var s = `<table class="table-outline hideImg">`;


    for (var i = 0; i < data.length; i++) {
        var u = data[i];
        console.log(u.TrangThai)

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
                    <i class="fa fa-remove" onclick="xoaNguoiDung('` + u.MaND + `')"></i>
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
    var kieuTim = document.getElementsByName('kieuTimKhachHang')[0].value;
    var text = inp.value;

    // Lọc
    var vitriKieuTim = {
        'ten': 1,
        'email': 2,
        'taikhoan': 3
    };

    var listTr_table = document.getElementsByClassName('khachhang')[0].getElementsByClassName('table-content')[0].getElementsByTagName('tr');
    for (var tr of listTr_table) {
        var td = tr.getElementsByTagName('td')[vitriKieuTim[kieuTim]].innerHTML.toLowerCase();

        if (td.indexOf(text.toLowerCase()) < 0) {
            tr.style.display = 'none';
        } else {
            tr.style.display = '';
        }
    }
}

//Thêm nhân viên
function checkThemKH() {
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
        // timeout: 1500,
        data: {
            request: 'themKH',
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
                title: 'Thêm khách hàng thành công ',
                confirmButtonText: 'Tuyệt'

            }).then((result) => {
                refreshTableKhachHang();
                showTaiKhoan(false);
            });
        },
        error: function(e) {
            Swal.fire({
                type: "error",
                title: "Lỗi",
            });
            console.log(e.responseText)
        }
    });

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

// vô hiệu hóa người dùng (tạm dừng, không cho đăng nhập vào)
function voHieuHoaNguoiDung(TrangThai) {
    if (TrangThai == 1)
    {

    }
    var span = inp.parentElement.nextElementSibling;
    span.innerHTML = (inp.checked ? 'Khóa' : 'Mở');
}

// Xóa người dùng
function xoaNguoiDung(mand) { 
    Swal.fire({
        title: "Bạn có chắc muốn xóa?",
        type: "question",
        showCancelButton: true,
        cancelButtonText: "Hủy"
    }).then((result)=>{
        if(result.value) {
            $.ajax({
                type: "POST",
                url: "php/xulykhachhang.php",
                dataType: "json",
                data: {
                    request: "delete",
                    mand: mand
                },
                success: function(data, status, xhr) {
                    refreshTableKhachHang();
                },
                error: function(e) {
                    // Swal.fire({
                    //     type: "error",
                    //     title: "Lỗi lấy dữ liệu khách Hàng (admin.js > refreshTableKhachHang)",
                    //     html: e.responseText
                    // });
                    console.log(e.responseText);
                }
            });
        }
    })
}

// Sắp xếp
function sortKhachHangTable(loai) {
    var list = document.getElementsByClassName('khachhang')[0].getElementsByClassName("table-content")[0];
    var tr = list.getElementsByTagName('tr');

    quickSort(tr, 0, tr.length - 1, loai, getValueOfTypeInTable_KhachHang);
    decrease = !decrease;
}

function getValueOfTypeInTable_KhachHang(tr, loai) {
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

// ================= các hàm thêm ====================
// Chuyển khuyến mãi vễ dạng chuỗi tiếng việt
function promoToStringValue(pr) {
    switch (pr.name) {
        case 'tragop':
            return 'Góp ' + pr.value + '%';
        case 'giamgia':
            return 'Giảm ' + pr.value;
        case 'giareonline':
            return 'Online (' + pr.value + ')';
        case 'moiramat':
            return 'Mới';
    }
    return '';
}

function progress(percent, bg, width, height) {

    return `<div class="progress" style="width: ` + width + `; height:` + height + `">
                <div class="progress-bar bg-info" style="width: ` + percent + `%; background-color:` + bg + `"></div>
            </div>`
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