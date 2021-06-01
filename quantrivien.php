<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title>QTV - Shoes Shop</title>
    <link rel="shortcut icon" href="img/favicon.ico" />

    <!-- Load font awesome icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" crossorigin="anonymous">

    <!-- Chart JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js"></script>

    <!-- Sweet Alert -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>

    <!-- Jquery -->
    <script src="lib/Jquery/Jquery.min.js"></script>

    <!-- Our files -->
    <link rel="stylesheet" href="css/admin/style.css">
    <link rel="stylesheet" href="css/admin/progress.css">
    <link rel="stylesheet" href="css/taikhoan.css">

    <!-- <script src="data/products.js"></script>
    <script src="js/classes.js"></script> -->
    <script src="js/dungchung.js"></script>
    <script src="js/quantrivien.js"></script>
    
</head>

<body>
    <header>
        <h2>Shoes Shop - Quản trị viên</h2>
    </header>

    <!-- Menu -->
    <aside class="sidebar">
        <ul class="nav">
            <li class="nav-title">MENU</li>
            <!-- <li class="nav-item"><a class="nav-link active"><i class="fa fa-home"></i> Home</a></li> -->
            <li class="nav-item" onclick="refreshTableChiNhanh()"><a class="nav-link"><i class="fa fa-th-large"></i> Nhãn Hiệu</a></li>
            <li class="nav-item" onclick="refreshTableNhanVien()"><a class="nav-link"><i class="fa fa-address-book-o"></i> Nhân Viên</a></li>
            <li class="nav-item"><a class="nav-link"><i class="fa fa-bar-chart-o"></i> Thống Kê</a></li>
            <hr>
            <li class="nav-item">
                <a class="nav-link" id="btnDangXuat">
                    <i class="fa fa-arrow-left"></i>
                    Đăng xuất
                </a>
            </li>
        </ul>
    </aside>

    <!-- Khung hiển thị chính -->
    <div class="main">
        <div class="home">

        </div>

        
        <!-- Nhãn Hiệu -->
        <div class="nhanhieu">
            <table class="table-header">
                <tr>
                    <!-- Theo độ rộng của table content -->
                    <th title="Sắp xếp" style="width: 15%" onclick="sortChiNhanhTable('stt')">STT <i class="fa fa-sort"></i></th>
                    <th title="Sắp xếp" style="width: 30%" onclick="sortChiNhanhTable('ten')">Tên <i class="fa fa-sort"></i></th>
                    <th title="Sắp xếp" style="width: 35%" onclick="sortChiNhanhTable('mota')">Mô tả <i class="fa fa-sort"></i></th>
                
                    <th style="width: 20%">Xóa nhãn hiệu</th>
                </tr>
            </table>

            <div class="table-content">
            </div>

            <div class="table-footer">
                <select name="kieuTimChiNhanh">
                    <option value="ten">Tìm theo tên</option>
                    <option value="mota">Tìm theo mô tả</option>
                </select>
                <input type="text" placeholder="Tìm kiếm..." onkeyup="timKiemChiNhanh(this)">
                <button onclick="document.getElementById('khungthemNH').style.transform = 'scale(1)';  autoMaLSP();"><i class="fa fa-plus-square"></i> Thêm nhãn hiệu</button>
            </div>

            <div id="khungthemNH" class="overlay">
                <span class="close" onclick="this.parentElement.style.transform = 'scale(0)';">&times;</span>
                <form method="POST" action="" enctype="multipart/form-data" onsubmit="return themNH();">
                    <table class="overlayTable table-outline table-content table-header">
                        <tr>
                            <th colspan="2">Thêm Nhãn Hiệu</th>
                        </tr>
                        <tr>
                            <td>Mã nhãn hiệu:</td>
                            <td><input disabled="disabled" type="text" id="manhThem" name="manhThem"></td>
                        </tr>
                        <tr>
                            <td>Tên nhãn hiệu:</td>
                            <td><input type="text" id="tennhThem"></td>
                        </tr>
                        <?php
                            $tenfilemoi= "";
                                if (isset($_POST["submit"]))
                                {
                                    if (($_FILES["hinhanh"]["type"]=="image/jpeg") ||($_FILES["hinhanh"]["type"]=="image/png") || ($_FILES["hinhanh"]["type"]=="image/jpg") && ($_FILES["hinhanh"]["size"] < 50000) )
                                    {
                                        if ($_FILES["file"]["error"] > 0 || file_exists("img/company/" . basename($_FILES["hinhanh"]["name"]))) 
                                        {
                                            echo ("Error Code: " . $_FILES["file"]["error"] . "<br />Chỉnh sửa ảnh lại sau)");
                                        }
                                        else
                                        {
                                            $file = $_FILES["hinhanh"]["name"];
                                            $tenfilemoi = "img/company/" .$_FILES["hinhanh"]["name"];
                                            move_uploaded_file( $_FILES["hinhanh"]["tmp_name"], $tenfilemoi);
                                        }
                                    }
                                }
                        ?>
                        <tr>
                            <td>Hình:</td>
                            <td>
                                <img class="hinhDaiDien" id="anhDaiDienNHThem" src="">
                                <input type="file" name="hinhanh" onchange="capNhatAnhNH(this.files, 'anhDaiDienNHThem', '<?php echo $tenfilemoi; ?>')">
                                <input style="display: none;" type="text" id="hinhanh" value="">
                            </td>
                        </tr>
                        <tr>
                            <td>Mô tả:</td>
                            <td><input id="mota" type="text"></td>
                        </tr>
                        <tr>
                            <td colspan="2" class="table-footer"> <button name="submit">THÊM</button> </td>
                        </tr>
                    </table>
                </form>
            </div>
        </div> <!-- // nhan hieu -->

        <!-- Nhân viên -->
        <div class="nhanvien">
            <table class="table-header">
                <tr>
                    <!-- Theo độ rộng của table content -->
                    <th title="Sắp xếp" style="width: 10%" onclick="sortNhanVienTable('stt')">STT <i class="fa fa-sort"></i></th>
                    <th title="Sắp xếp" style="width: 25%" onclick="sortNhanVienTable('hoten')">Họ tên <i class="fa fa-sort"></i></th>
                    <th title="Sắp xếp" style="width: 30%" onclick="sortNhanVienTable('email')">Email <i class="fa fa-sort"></i></th>
                    <th title="Sắp xếp" style="width: 20%" onclick="sortNhanVienTable('taikhoan')">Tài khoản <i class="fa fa-sort"></i></th>
                
                    <th style="width: 15%">Hành động</th>
                </tr>
            </table>

            <div class="table-content">
            </div>

            <div class="table-footer">
                <select name="kieuTimNhanVien">
                    <option value="ten">Tìm theo họ tên</option>
                    <option value="email">Tìm theo email</option>
                    <option value="taikhoan">Tìm theo tài khoản</option>
                </select>
                <input type="text" placeholder="Tìm kiếm..." onkeyup="timKiemNguoiDung(this)">
                <button onclick="showTaiKhoan(true);"><i class="fa fa-plus-square"></i> Thêm nhân viên</button>
            </div>

            <div class="containTaikhoan">
            <span class="close" onclick="showTaiKhoan(false);">&times;</span> 
                <div class=" taikhoan">
                    <div class="tab-content">
                        <div id="signup" style="display: block;">
                            <h1>THÊM MỚI NHÂN VIÊN</h1>
                            <!-- <form onsubmit="return signUp(this);"> -->
                            <form action="" method="post" name="formDangKy" onsubmit="return checkThemNV();">
                                <div class="top-row">
                                    <div class="field-wrap">
                                        <label>
                                            Họ<span class="req">*</span>
                                        </label>
                                        <input name="ho" type="text" id="ho" required autocomplete="off" />
                                    </div>
                                    <div class="field-wrap">
                                        <label>
                                            Tên<span class="req">*</span>
                                        </label>
                                        <input name="ten" id="ten" type="text" required autocomplete="off" />
                                    </div>
                                </div> <!-- / ho ten -->
                                <div class="top-row">
                                    <div class="field-wrap">
                                        <label>
                                            Điện thoại<span class="req">*</span>
                                        </label>
                                        <input name="sdt" id="sdt" type="text" pattern="\d*" minlength="10" maxlength="12" required autocomplete="off" />
                                    </div> <!-- /sdt -->
                                    <div class="field-wrap">
                                        <label>
                                            Email<span class="req">*</span>
                                        </label>
                                        <input name="email" id="email" type="email" required autocomplete="off" />
                                    </div> <!-- /email -->
                                </div>
                                <div class="field-wrap">
                                    <label>
                                        Giới tính<span class="req">*</span>
                                    </label>
                                    <input name="gioitinh" id="gioitinh" type="text" required autocomplete="off" />
                                </div>
                                <div class="field-wrap">
                                    <label>
                                        Địa chỉ<span class="req">*</span>
                                    </label>
                                    <input name="diachi" id="diachi" type="text" required autocomplete="off" />
                                </div> <!-- /user name -->
                                <div class="field-wrap">
                                    <label>
                                        Tên đăng nhập<span class="req">*</span>
                                    </label>
                                    <input name="newUser" id="newUser" type="text" required autocomplete="off" />
                                </div> <!-- /user name -->
                                <div class="field-wrap">
                                    <label>
                                        Mật khẩu<span class="req">*</span>
                                    </label>
                                    <input name="newPass" id="newPass" type="password" required autocomplete="off" />
                                </div> <!-- /pass -->
                                <button type="submit" class="button button-block" >Thêm</button>
                            </form> <!-- /form -->
                        </div> <!-- /sign up -->
                    </div><!-- tab-content -->
                </div> <!-- /taikhoan -->
            </div>
        </div> <!-- // nhanvien -->

        <!-- Thống kê -->
        <div class="thongke">
            <div class="canvasContainer">
                <canvas id="myChart1"></canvas>
            </div>

            <div class="canvasContainer">
                <canvas id="myChart2"></canvas>
            </div>

            <div class="canvasContainer">
                <canvas id="myChart3"></canvas>
            </div>

            <div class="canvasContainer">
                <canvas id="myChart4"></canvas>
            </div>

        </div>
    </div> <!-- // main -->


    <footer>

    </footer>
</body>

</html>