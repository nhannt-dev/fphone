import icons from "./icons";
import path from "./path";

const {
    SlScreenSmartphone,
    AiOutlineUsb,
    FcIpad,
    BsLaptop,
    MdOutlineWatch,
    TfiHeadphone,
    BiUserCircle,
    AiFillHeart,
    AiOutlineHistory,
    MdMonetizationOn,
    MdOutlineDashboard,
    FaUserFriends,
    FaProductHunt,
    MdOutlineBrandingWatermark,
    RiCoupon2Fill,
    RiBillLine
} = icons

export const iconsSidebar = [
    {
        name: 'Đồng hồ',
        icon: <MdOutlineWatch size={25} color='black' />
    },
    {
        name: 'Phụ kiện',
        icon: <AiOutlineUsb size={25} color='black' />
    },
    {
        name: 'Máy tính bảng',
        icon: <FcIpad size={25} color='black' />
    },
    {
        name: 'Laptop',
        icon: <BsLaptop size={25} color='black' />
    },
    {
        name: 'Điện thoại',
        icon: <SlScreenSmartphone size={25} color='black' />
    },
    {
        name: 'Âm thanh',
        icon: <TfiHeadphone size={25} color='black' />
    }
]

export const sidebarPersonal = [
    {
        name: 'Thông tin tài khoản',
        icons: <BiUserCircle size={22} />,
        path: path.SMEMBER + '/' + path.PERSONAL
    },
    {
        name: 'Sản phẩm yêu thích',
        icons: <AiFillHeart size={22} />,
        path: path.SMEMBER + '/' + path.WISHLIST
    },
    {
        name: 'Xác nhận mua',
        icons: <MdMonetizationOn size={22} />,
        path: path.SMEMBER + '/' + path.BUY
    },
    {
        name: 'Lịch sử mua hàng',
        icons: <AiOutlineHistory size={22} />,
        path: path.SMEMBER + '/' + path.BUY_HISTORY
    },
]
export const adminSidebar = [
    {
        name: 'Tổng quan',
        icons: <MdOutlineDashboard size={22} />,
        path: path.SYSTEM + '/' + path.STATITICS
    },
    {
        name: 'Quản lý thành viên',
        icons: <FaUserFriends size={22} />,
        path: path.SYSTEM + '/' + path.MANAGE_USER
    },
    {
        name: 'Quản lý sản phẩm',
        icons: <FaProductHunt size={22} />,
        path: path.SYSTEM + '/' + path.MANAGE_PRODUCT
    },
    {
        name: 'Quản lý nhãn hiệu',
        icons: <MdOutlineBrandingWatermark size={22} />,
        path: path.SYSTEM + '/' + path.MANAGE_BRAND
    },
    {
        name: 'Quản lý coupon',
        icons: <RiCoupon2Fill size={22} />,
        path: path.SYSTEM + '/' + path.MANAGE_COUPON
    },
    {
        name: 'Quản lý hóa đơn',
        icons: <RiBillLine size={22} />,
        path: path.SYSTEM + '/' + path.MANAGE_Bill
    },
]

export const filters = [
    {
        title: 'Hệ điều hành',
        subs: ['Android', 'IOS'],
        id: 1
    },
    {
        title: 'Tính năng đặc biệt',
        subs: ['Sạc không dây', 'Bảo mật vân tay', 'Nhận diện khuôn mặt', 'Kháng nước, kháng bụi', 'Hỗ trợ 5G'],
        id: 2
    },
    {
        title: 'Tần số quét',
        subs: ['60 Hz', '90 Hz', '120 Hz', 'Khác'],
        id: 3
    },
    {
        title: 'Kiểu màn hình',
        subs: ['Tai thỏ', 'Tràn viền', 'Màn hình gập', 'Giọt nước', 'Nốt ruồi'],
        id: 4
    },
    {
        title: 'Tính năng camera',
        subs: ['Chụp xóa phông', 'Chụp góc rộng', 'Quay video 4K', 'Chụp zoom xa', 'Chống rung', 'Chụp macro'],
        id: 5
    },
    {
        title: 'Nhu cầu sử dụng',
        subs: ['Chơi game', 'Pin trâu', 'Dung lượng lớn', 'Cấu hình cao', 'Mông nhẹ', 'Chụp ảnh đẹp', 'Nhỏ gọn'],
        id: 6
    },
]

