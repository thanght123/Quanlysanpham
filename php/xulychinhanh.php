<?php
    require_once('../BackEnd/ConnectionDB/DB_classes.php');

    if(!isset($_POST['request']) && !isset($_GET['request'])) die(null);

    switch ($_POST['request']) {
    	case 'getall':
				$chinhanh = (new LoaiSanPhamBUS())->select_all();
                
		    	die (json_encode($chinhanh));
    		break;

    	case 'changeTT':
				$chinhanhBUS = new LoaiSanPhamBUS();
				$key = $_POST['key'];
				$trangthai = $_POST['trangThai'];
				
		    	die (json_encode($chinhanhBUS->capNhapTrangThai($trangthai, $key)));
			break;
			
		//thêm
        case 'add':
			$data = $_POST['dataAdd'];
			$spAddArr = array(
				'MaLSP' => $data['malsp'],
				'TenLSP' => $data['name'],
				'HinhAnh' => $data['img'],
				'Mota' => $data['description']
			);

			$lspBUS = new LoaiSanPhamBUS();
			die (json_encode($lspBUS->add_new($spAddArr)));
		break;

	    case 'delete':
				$chinhanhBUS = new LoaiSanPhamBUS();
				$mand = $_POST['mand'];
					
			    die (json_encode($chinhanhBUS->delete_by_id($mand	)));
	    	break;


	default:
    		# code...
    		break;
    }
?>