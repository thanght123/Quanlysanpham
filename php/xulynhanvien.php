<?php
    require_once('../BackEnd/ConnectionDB/DB_classes.php');

    if(!isset($_POST['request']) && !isset($_GET['request'])) die(null);

    switch ($_POST['request']) {
    	case 'getall':
				$nhanvien = (new NguoiDungBUS())->select_all();
                
		    	die (json_encode($nhanvien));
			break;
			
		case 'getemployee':
			$nhanvien = (new NguoiDungBUS())->select_employee();
			
			die (json_encode($nhanvien));
		break;

    	case 'changeTT':
				$nhanvienBUS = new NguoiDungBUS();
				$key = $_POST['key'];
				$trangthai = $_POST['trangThai'];
				
		    	die (json_encode($nhanvienBUS->capNhapTrangThai($trangthai, $key)));
    		break;
		
		case 'delete':
			$nhanvienBUS = new NguoiDungBUS();
			$mand = $_POST['mand'];
				
			die (json_encode($nhanvienBUS->delete_by_id($mand	)));
		break;


	default:
    		# code...
    		break;
    }
?>