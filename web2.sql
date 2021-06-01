-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th7 07, 2020 lúc 07:48 AM
-- Phiên bản máy phục vụ: 10.1.31-MariaDB
-- Phiên bản PHP: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `web2`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitiethoadon`
--

CREATE TABLE `chitiethoadon` (
  `MaHD` int(11) NOT NULL,
  `MaSP` int(11) NOT NULL,
  `SoLuong` int(11) NOT NULL,
  `DonGia` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `chitiethoadon`
--

INSERT INTO `chitiethoadon` (`MaHD`, `MaSP`, `SoLuong`, `DonGia`) VALUES
(1, 46, 1, 199000),
(1, 4, 1, 349000),
(2, 4, 1, 349000),
(3, 12, 1, 349000),
(3, 4, 1, 399000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `danhgia`
--

CREATE TABLE `danhgia` (
  `MaSP` int(11) NOT NULL,
  `MaND` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `SoSao` int(11) NOT NULL,
  `BinhLuan` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `NgayLap` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `danhgia`
--

INSERT INTO `danhgia` (`MaSP`, `MaND`, `SoSao`, `BinhLuan`, `NgayLap`) VALUES
(4, '2', 5, 'Sản phẩm y hình <3', '2020-07-05 14:36:53'),
(1, '1', 4, 'Được của nó :D', '2020-07-05 14:42:21'),
(1, '2', 5, 'Good!!!', '2020-07-05 14:51:41');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hoadon`
--

CREATE TABLE `hoadon` (
  `MaHD` int(11) NOT NULL,
  `MaND` int(11) NOT NULL,
  `NgayLap` datetime NOT NULL,
  `NguoiNhan` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `SDT` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `DiaChi` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `PhuongThucTT` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `TongTien` float NOT NULL,
  `TrangThai` varchar(70) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `hoadon`
--

INSERT INTO `hoadon` (`MaHD`, `MaND`, `NgayLap`, `NguoiNhan`, `SDT`, `DiaChi`, `PhuongThucTT`, `TongTien`, `TrangThai`) VALUES
(1, 2, '2020-06-20 13:20:56', 'Lê Thị Ly', '0123456789', 'Hà Nội', 'Trực tiếp khi nhận h', 548000, '1'),
(2, 1, '2020-06-20 04:56:52', 'Nghiêm Phú Thiết', '0123456789', 'Hà Nội', 'Qua thẻ ngân hàng', 349000, '1'),
(3, 1, '2020-07-05 14:13:09', 'Nghiêm Phú Thiết', '0123456789', 'Hà Nội', 'Trực tiếp khi nhận h', 698000, '1');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `khuyenmai`
--

CREATE TABLE `khuyenmai` (
  `MaKM` int(11) NOT NULL,
  `TenKM` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `LoaiKM` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `GiaTriKM` float NOT NULL,
  `NgayBD` datetime NOT NULL,
  `NgayKT` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `khuyenmai`
--

INSERT INTO `khuyenmai` (`MaKM`, `TenKM`, `LoaiKM`, `GiaTriKM`, `NgayBD`, `NgayKT`) VALUES
(1, 'Không khuyến mãi', 'Nothing', 0, '2020-06-20 00:00:00', '2020-12-01 00:00:00'),
(2, 'Giảm giá', 'GiamGia', 50000, '2020-06-20 00:00:00', '2020-12-01 00:00:00'),
(3, 'Giá rẻ online', 'GiaReOnline', 50000, '2020-06-20 00:00:00', '2020-12-01 00:00:00'),
(4, 'Mới ra mắt', 'MoiRaMat', 0, '2020-06-20 00:00:00', '2020-12-01 00:00:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `loaisanpham`
--

CREATE TABLE `loaisanpham` (
  `MaLSP` int(11) NOT NULL,
  `TenLSP` varchar(70) COLLATE utf8_unicode_ci NOT NULL,
  `HinhAnh` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `Mota` varchar(200) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `loaisanpham`
--

INSERT INTO `loaisanpham` (`MaLSP`, `TenLSP`, `HinhAnh`, `Mota`) VALUES
(1, 'Adidas', 'Adidas.png', 'Giày Adidas'),
(2, 'Bitis', 'Bitis.png', 'Giày Bitis'),
(3, 'Converse', 'Converse.png', 'Giày Converse'),
(4, 'Nike', 'Nike.png', 'Giày Nike'),
(5, 'Puma', 'Puma.png', 'Giày Puma'),
(6, 'Vans', 'Vans.png', 'Giày Vans');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nguoidung`
--

CREATE TABLE `nguoidung` (
  `MaND` int(11) NOT NULL,
  `Ho` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `Ten` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `GioiTinh` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `SDT` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `Email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `DiaChi` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `TaiKhoan` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `MatKhau` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `MaQuyen` int(11) NOT NULL,
  `TrangThai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `nguoidung`
--

INSERT INTO `nguoidung` (`MaND`, `Ho`, `Ten`, `GioiTinh`, `SDT`, `Email`, `DiaChi`, `TaiKhoan`, `MatKhau`, `MaQuyen`, `TrangThai`) VALUES
(1, 'Nghiêm Phú', 'Thiết', 'Nam', '0123456789', 'npt@gmail.com', 'Hà Nội', 'thietnp', '202cb962ac59075b964b07152d234b70', 1, 1),
(2, 'Lê Thị', 'Ly', 'Nữ', '0123456789', 'ltl@gmail.com', 'Thanh Hóa', 'ly', '202cb962ac59075b964b07152d234b70', 1, 1),
(3, 'Nghiêm Phú', 'Thiết', 'Nam', '0977971972', 'admin@gmail.com', 'Hà Nội', 'admin', '202cb962ac59075b964b07152d234b70', 3, 1),
(4, 'Vũ Đức', 'Cương', 'Nam', '01207764668', 'vuduccuong@gmail.com', 'Vĩnh Phúc', 'staff1', '202cb962ac59075b964b07152d234b70', 2, 1),
(5, 'Hứa Ngọc', 'Oanh', 'Nữ', '0326227224', 'huangocoanh@gmail.com', 'Lạng Sơn', 'staff2', '202cb962ac59075b964b07152d234b70', 2, 1),
(6, 'Nghiêm Phú', 'Thiết', 'Nam', '0988918980', 'npt@yahoo.com', 'Hà Tây', 'staff3', '202cb962ac59075b964b07152d234b70', 2, 1),
(8, 'Đinh Thị Huyền', 'Trang', '', '0988988988', 'trang@gmail.com', 'Thanh Hóa', 'trang', '202cb962ac59075b964b07152d234b70', 1, 1),
(9, 'Hứa Ngọc ', 'Oanh', '', '0988918981', 'oanh@gmail.com', 'Lạng Sơn', 'oanh', '202cb962ac59075b964b07152d234b70', 1, 1),
(11, 'Vũ Đức', 'Cương', 'Nam', '0917872980', 'cuong@gmail.com', 'Vĩnh Phúc', 'cuong', '202cb962ac59075b964b07152d234b70', 1, 1),
(12, 'Đinh Thị Huyền', 'Trang', '', '0326227221', 'trang@gmail.com', 'Thanh Hóa', 'staff4', '202cb962ac59075b964b07152d234b70', 2, 1),
(13, 'Nguyễn Văn', 'A', 'Nam', '0324225226', 'a@gmail.com', 'HN', 'nva', '202cb962ac59075b964b07152d234b70', 1, 1),
(14, 'Nguyễn Văn ', 'B', 'Nam', '0977918984', 'b@gmail.com', 'HN', 'nvb', '202cb962ac59075b964b07152d234b70', 1, 1),
(15, 'Nghiêm', 'PT', 'Nam', '0987654321', 'npt@yahoo.com', 'HN', 'npt', '202cb962ac59075b964b07152d234b70', 1, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phanquyen`
--

CREATE TABLE `phanquyen` (
  `MaQuyen` int(11) NOT NULL,
  `TenQuyen` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `ChiTietQuyen` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `phanquyen`
--

INSERT INTO `phanquyen` (`MaQuyen`, `TenQuyen`, `ChiTietQuyen`) VALUES
(1, 'Customer', 'Khách hàng'),
(2, 'Employee', 'Nhân viên'),
(3, 'Manager', 'Quản trị viên');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sanpham`
--

CREATE TABLE `sanpham` (
  `MaSP` int(11) NOT NULL,
  `MaLSP` int(11) NOT NULL,
  `TenSP` varchar(70) COLLATE utf8_unicode_ci NOT NULL,
  `DonGia` int(11) NOT NULL,
  `SoLuong` int(10) UNSIGNED NOT NULL DEFAULT '1',
  `HinhAnh` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `MaKM` int(11) NOT NULL,
  `SoSao` int(11) NOT NULL,
  `SoDanhGia` int(11) NOT NULL,
  `TrangThai` int(11) NOT NULL,
  `MoTa` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `sanpham`
--

INSERT INTO `sanpham` (`MaSP`, `MaLSP`, `TenSP`, `DonGia`, `SoLuong`, `HinhAnh`, `MaKM`, `SoSao`, `SoDanhGia`, `TrangThai`, `MoTa`) VALUES
(1, 1, 'Giày Adidas 1', 349000, 25, 'img/products/adidas1.jpg', 1, 5, 2, 1, 'Đủ size kèm hộp xịn sò cho cả nhà'),
(2, 1, 'Giày Adidas 2', 699000, 10, 'img/products/adidas2.jpg', 2, 0, 0, 1, 'Đủ size kèm hộp xịn sò cho cả nhà'),
(3, 1, 'Giày Adidas 3', 499000, 10, 'img/products/adidas3.jpg', 2, 0, 0, 1, 'HÀNG CHÍNH HÃNG'),
(4, 2, 'Giày Bitis 1', 399000, 10, 'img/products/bitis1.jpg', 3, 5, 1, 1, 'Đủ size kèm hộp xịn sò cho cả nhà'),
(5, 2, 'Giày Bitis 2', 629000, 10, 'img/products/bitis2.jpg', 2, 0, 0, 1, 'HÀNG CHÍNH HÃNG'),
(6, 2, 'Giày Bitis 3', 1199000, 10, 'img/products/bitis3.jpg', 2, 0, 0, 1, 'Đủ size kèm hộp xịn sò cho cả nhà'),
(7, 3, 'Giày Converce 1', 249000, 10, 'img/products/cv1.jpg', 4, 0, 0, 1, 'HÀNG CHÍNH HÃNG'),
(8, 3, 'Giày Converce 2', 669000, 10, 'img/products/cv2.jpg', 4, 0, 0, 1, 'Đủ size kèm hộp xịn sò cho cả nhà'),
(9, 3, 'Giày Converce 3', 899000, 10, 'img/products/cv3.jpg', 4, 0, 0, 1, 'HÀNG CHÍNH HÃNG'),
(10, 4, 'Giày Nile 1', 149000, 10, 'img/products/nike1.jpg', 1, 0, 0, 1, 'Đủ size kèm hộp xịn sò cho cả nhà'),
(11, 4, 'Giày Nile 2', 170000, 10, 'img/products/nike2.jpg', 3, 0, 0, 1, 'HÀNG CHÍNH HÃNG'),
(12, 4, 'Giày Nile 3', 349000, 10, 'img/products/nike3.jpg', 4, 0, 0, 1, 'HÀNG CHÍNH HÃNG'),
(13, 5, 'Giày Puma 1', 249000, 10, 'img/products/puma1.jpg', 1, 0, 0, 1, 'Đủ size kèm hộp xịn sò cho cả nhà'),
(14, 5, 'Giày Puma 2', 285000, 10, 'img/products/puma2.jpg', 1, 0, 0, 1, 'HÀNG CHÍNH HÃNG'),
(15, 5, 'Giày Puma 3', 260000, 10, 'img/products/puma3.jpg', 1, 0, 0, 1, 'Đủ size kèm hộp xịn sò cho cả nhà'),
(16, 6, 'Giày Vans 1', 569000, 10, 'img/products/vans1.jpg', 1, 0, 0, 1, 'HÀNG CHÍNH HÃNG'),
(17, 6, 'Giày Vans 2', 479000, 10, 'img/products/vans2.jpg', 1, 0, 0, 1, 'Đủ size kèm hộp xịn sò cho cả nhà'),
(21, 6, 'Giày Vans 3', 999000, 10, 'img/products/vans3.jpg', 2, 0, 0, 1, 'HÀNG CHÍNH HÃNG'),
(22, 6, 'Giày Vans 4', 899000, 10, 'img/products/vans4.jpg', 4, 0, 0, 1, 'Đủ size kèm hộp xịn sò cho cả nhà'),
(30, 6, 'Giày Vans 5', 749000, 10, 'img/products/vans5.jpg', 2, 0, 0, 1, 'HÀNG CHÍNH HÃNG'),
(31, 1, 'Giày Adidas 4', 1099000, 10, 'img/products/adidas4.jpg', 4, 0, 0, 1, 'HÀNG CHÍNH HÃNG'),
(32, 1, 'Giày Adidas 5', 329000, 10, 'img/products/adidas5.jpg', 4, 0, 0, 1, 'Đủ size kèm hộp xịn sò cho cả nhà'),
(33, 2, 'Giày Bitis 4', 499000, 10, 'img/products/bitis4.jpg', 2, 0, 0, 1, 'HÀNG CHÍNH HÃNG'),
(34, 2, 'Giày Bitis 5', 550000, 10, 'img/products/bitis5.jpg', 1, 0, 0, 1, 'Đủ size kèm hộp xịn sò cho cả nhà'),
(36, 3, 'Giày Converce 4', 179000, 10, 'img/products/adidas4.jpg', 4, 0, 0, 1, 'HÀNG CHÍNH HÃNG'),
(38, 1, 'Giày Adidas 6', 1350000, 10, 'img/products/adidas6.jpg', 4, 0, 0, 1, 'Đủ size kèm hộp xịn sò cho cả nhà'),
(39, 4, 'Giày Nike 4', 160000, 10, 'img/products/nike4.jpg', 1, 0, 0, 1, 'Đủ size kèm hộp xịn sò cho cả nhà'),
(41, 5, 'Giày Puma 4', 239000, 10, 'img/products/puma4.jpg', 4, 0, 0, 1, 'Đủ size kèm hộp xịn sò cho cả nhà'),
(42, 5, 'Giày Puma 5', 769000, 10, 'img/products/puma5.jpg', 4, 0, 0, 1, 'Đủ size kèm hộp xịn sò cho cả nhà'),
(44, 4, 'Giày Nike 6', 189000, 10, 'img/products/nike6.jpg', 4, 0, 0, 1, 'Đủ size kèm hộp xịn sò cho cả nhà'),
(46, 4, 'Giày Nike 7', 249000, 10, 'img/products/nike7.jpg', 3, 0, 0, 1, 'Đủ size kèm hộp xịn sò cho cả nhà'),
(47, 1, 'Giày a', 150000, 20, 'img/products/goku.jpg', 1, 0, 0, 1, 'Đủ size kèm hộp xịn sò nha cc'),
(48, 1, 'Giày 48', 150000, 20, 'img/products/NPT1.png', 1, 0, 0, 1, 'Giày Snacker');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `chitiethoadon`
--
ALTER TABLE `chitiethoadon`
  ADD KEY `MaHD` (`MaHD`),
  ADD KEY `MaSP` (`MaSP`);

--
-- Chỉ mục cho bảng `danhgia`
--
ALTER TABLE `danhgia`
  ADD KEY `MaSP` (`MaSP`);

--
-- Chỉ mục cho bảng `hoadon`
--
ALTER TABLE `hoadon`
  ADD PRIMARY KEY (`MaHD`),
  ADD KEY `MaKH` (`MaND`);

--
-- Chỉ mục cho bảng `khuyenmai`
--
ALTER TABLE `khuyenmai`
  ADD PRIMARY KEY (`MaKM`);

--
-- Chỉ mục cho bảng `loaisanpham`
--
ALTER TABLE `loaisanpham`
  ADD PRIMARY KEY (`MaLSP`);

--
-- Chỉ mục cho bảng `nguoidung`
--
ALTER TABLE `nguoidung`
  ADD PRIMARY KEY (`MaND`),
  ADD KEY `MaQuyen` (`MaQuyen`);

--
-- Chỉ mục cho bảng `phanquyen`
--
ALTER TABLE `phanquyen`
  ADD PRIMARY KEY (`MaQuyen`);

--
-- Chỉ mục cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  ADD PRIMARY KEY (`MaSP`),
  ADD KEY `LoaiSP` (`MaLSP`),
  ADD KEY `MaKM` (`MaKM`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `hoadon`
--
ALTER TABLE `hoadon`
  MODIFY `MaHD` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `khuyenmai`
--
ALTER TABLE `khuyenmai`
  MODIFY `MaKM` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `loaisanpham`
--
ALTER TABLE `loaisanpham`
  MODIFY `MaLSP` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `nguoidung`
--
ALTER TABLE `nguoidung`
  MODIFY `MaND` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT cho bảng `phanquyen`
--
ALTER TABLE `phanquyen`
  MODIFY `MaQuyen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `MaSP` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `chitiethoadon`
--
ALTER TABLE `chitiethoadon`
  ADD CONSTRAINT `chitiethoadon_ibfk_1` FOREIGN KEY (`MaSP`) REFERENCES `sanpham` (`MaSP`),
  ADD CONSTRAINT `chitiethoadon_ibfk_2` FOREIGN KEY (`MaHD`) REFERENCES `hoadon` (`MaHD`);

--
-- Các ràng buộc cho bảng `danhgia`
--
ALTER TABLE `danhgia`
  ADD CONSTRAINT `danhgia_ibfk_1` FOREIGN KEY (`MaSP`) REFERENCES `sanpham` (`MaSP`);

--
-- Các ràng buộc cho bảng `hoadon`
--
ALTER TABLE `hoadon`
  ADD CONSTRAINT `hoadon_ibfk_1` FOREIGN KEY (`MaND`) REFERENCES `nguoidung` (`MaND`);

--
-- Các ràng buộc cho bảng `nguoidung`
--
ALTER TABLE `nguoidung`
  ADD CONSTRAINT `nguoidung_ibfk_1` FOREIGN KEY (`MaQuyen`) REFERENCES `phanquyen` (`MaQuyen`);

--
-- Các ràng buộc cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  ADD CONSTRAINT `sanpham_ibfk_1` FOREIGN KEY (`MaLSP`) REFERENCES `loaisanpham` (`MaLSP`),
  ADD CONSTRAINT `sanpham_ibfk_2` FOREIGN KEY (`MaKM`) REFERENCES `khuyenmai` (`MaKM`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
