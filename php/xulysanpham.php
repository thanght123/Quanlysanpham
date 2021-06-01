<?php
    require_once('../BackEnd/ConnectionDB/DB_classes.php');

    if(!isset($_POST['request']) && !isset($_GET['request'])) die(null);

    switch ($_POST['request']) {
    	// lấy tất cả sản phẩm
    	case 'getall':
				$dssp = (new SanPhamBUS())->select_all();
                for($i = 0; $i < sizeof($dssp); $i++) {
                    // thêm thông tin khuyến mãi
                    $dssp[$i]["KM"] = (new KhuyenMaiBUS())->select_by_id('*', $dssp[$i]['MaKM']);
                    // thêm thông tin hãng
                    $dssp[$i]["LSP"] = (new LoaiSanPhamBUS())->select_by_id('*', $dssp[$i]['MaLSP']);
                }
		    	die (json_encode($dssp));
    		break;

        case 'getbyid':
            $sp = (new SanPhamBUS())->select_by_id("*", $_POST['id']);
            // thêm thông tin khuyến mãi và hãng
            $sp["KM"] = (new KhuyenMaiBUS())->select_by_id('*', $sp['MaKM']);
            $sp["LSP"] = (new LoaiSanPhamBUS())->select_by_id('*', $sp['MaLSP']);

            die (json_encode($sp));
            break;

        case 'getlistbyids':
            $listID = $_POST['listID'];
            $sql = "SELECT * FROM SanPham WHERE ";

            forEach($listID as $id) {
                $sql .= "MaSP=".$id." OR ";
            }
            $sql.=" 1=0";

            $result = (new DB_driver())->get_list($sql);
            
            for($i = 0; $i < sizeof($result); $i++) {
                // thêm thông tin khuyến mãi
                $result[$i]["KM"] = (new KhuyenMaiBUS())->select_by_id('*', $result[$i]['MaKM']);
                // thêm thông tin hãng
                $result[$i]["LSP"] = (new LoaiSanPhamBUS())->select_by_id('*', $result[$i]['MaLSP']);
            }

            die (json_encode($result));
            break;

        case 'phanTich_Filters':
            phanTich_Filters();
            break;

        case 'addFromWeb1':
            addFromWeb1();
            break;

        //thêm
        case 'add':
            $data = $_POST['dataAdd'];
            $spAddArr = array(
                'MaSP' => $data['masp'],
                'MaLSP' => $data['company'],
                'TenSP' => $data['name'],
                'DonGia' => $data['price'],
                'SoLuong' => $data['amount'],
                'HinhAnh' => $data['img'],
                'MaKM' => $data['promo']['name'],
                'SoSao' => $data['star'],
                'SoDanhGia' => $data['rateCount'],
                'TrangThai' => $data['TrangThai'],
                'MoTa' => $data['description']
            );

            $spBUS = new SanPhamBUS();
            die (json_encode($spBUS->add_new($spAddArr)));
        break;
        
        case 'edit':
            $data = $_POST['dataEdit'];
            $id = $data['masp'];
            $spEditArr = array(
                'MaLSP' => $data['company'],
                'TenSP' => $data['name'],
                'DonGia' => $data['price'],
                'SoLuong' => $data['amount'],
                'HinhAnh' => $data['img'],
                'MaKM' => $data['promo']['name'],
                'SoSao' => $data['star'],
                'SoDanhGia' => $data['rateCount'],
                'TrangThai' => $data['TrangThai'],
                'MoTa' => $data['description']
            );

            $spBUS = new SanPhamBUS();
            die (json_encode($spBUS->update_by_id($spEditArr, $id)));
        break;

        // xóa
        case 'delete':
                $spBUS = new SanPhamBUS();
                $maSPDel = $_POST['maspdelete'];
                die (json_encode($spBUS->delete_by_id($maSPDel)));
            break;

        case 'hide' :
            $id = $_POST["id"];
            $trangthai = $_POST["trangthai"];
            die (json_encode((new SanPhamBUS())->capNhapTrangThai($trangthai, $id)));
            break;
    	
    	default:
    		# code...
    		break;
    }

    function phanTich_Filters() {
        $filters = $_POST['filters'];
        $ori = "SELECT * FROM SanPham WHERE TrangThai=1 AND SoLuong>0 AND ";
        $sql = $ori;
        $db = new DB_driver();
        $db->connect();

        // $page = null;
        $tenThanhPhanCanSort = null;
        $typeSort = null;

        forEach($filters as $filter) {
            $dauBang = explode("=", $filter);
            switch ($dauBang[0]) {
                case 'search':
                    $dauBang[1] = explode("+", $dauBang[1]);
                    $dauBang[1] = join(" ", $dauBang[1]);
                    $dauBang[1] = mysqli_escape_string($db->__conn, $dauBang[1]);
                    $sql .= ($sql==$ori?"":" AND ") . " TenSP LIKE '%$dauBang[1]%' ";
                    break;

                case 'price':
                    $prices = explode("-", $dauBang[1]);
                    $giaTu = (int)$prices[0];
                    $giaDen = (int)$prices[1];

                    // nếu giá đến = 0 thì cho giá đến = 100 triệu
                    if($giaDen == 0) $giaDen = 1000000000;

                    $sql .= ($sql==$ori?"":" AND ") . " DonGia >= $giaTu AND DonGia <= $giaDen";
                    break;

                case 'company':
                    $companyID = $dauBang[1];
                    $sql .= ($sql==$ori?"":" AND ") . " MaLSP='$companyID'";
                    break;

                case 'star':
                    $soSao = (int)$dauBang[1];
                    $sql .= ($sql==$ori?"":" AND ") . " SoSao >= $soSao";
                    break;

                case 'promo':
                    // lấy id khuyến mãi
                    $loaikm = $dauBang[1];
                    $khuyenmai = (new DB_driver())->get_row("SELECT * FROM KhuyenMai WHERE LoaiKM='$loaikm'");
                    $khuyenmaiID = $khuyenmai["MaKM"];
                    
                    $sql .= ($sql==$ori?"":" AND ") . " MaKM='$khuyenmaiID'";
                    break;

                case 'sort':
                    $s = explode("-", $dauBang[1]);
                    $tenThanhPhanCanSort = $s[0];
                    $typeSort = ($s[1]=="asc"?"ASC":"DESC");
                    break;

                default:
                    # code...
                    break;
            }
        }

        // sort phải để cuối
        if($tenThanhPhanCanSort != null && $typeSort != null) {
            $sql .= ($sql==$ori?" 1=1 ":""); // fix lỗi dư chữ AND 
            $sql .= " ORDER BY $tenThanhPhanCanSort $typeSort";
        }


        // chạy sql
        $result = $db->get_list($sql);
        $db->dis_connect();

        for($i = 0; $i < sizeof($result); $i++) {
            // thêm thông tin khuyến mãi
            $result[$i]["KM"] = (new KhuyenMaiBUS())->select_by_id('*', $result[$i]['MaKM']);
            // thêm thông tin hãng
            $result[$i]["LSP"] = (new LoaiSanPhamBUS())->select_by_id('*', $result[$i]['MaLSP']);
        }
        die (json_encode($result));
    }

    function addFromWeb1() {
        $spBUS = new SanPhamBUS();

        $sp = $_POST['sanpham'];
        $loaisanpham = (new DB_driver())->get_row("SELECT * FROM LoaiSanPham WHERE TenLSP='".$sp["company"]."'");

        $sanphamArr = array(
            'MaSP' => "",
            'MaLSP' => $loaisanpham['MaLSP'],
            'TenSP' => $sp['name'],
            'DonGia' => $sp['price'],
            'SoLuong' => 10,
            'HinhAnh' => $sp['img'],
            'MaKM' => $sp['MaKM'],
            'SoSao' => 0,
            'SoDanhGia' => 0,
            'TrangThai' => 1,
            'MoTa' => $sp['MoTa']
        );  
        
        die (json_encode($spBUS->add_new($sanphamArr)));
    }
?>
