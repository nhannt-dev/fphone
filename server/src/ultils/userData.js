import { v4 } from "uuid"
const userData = [
    {
        id: 'dsaa',
        name: 'Nguyễn Văn Bình',
        password: '123456',
        email: `user2@gmail.com`,
        role: 'admin'
    },
    {
        id: 'fdsfsd',
        name: 'Nguyễn Văn Anh',
        password: '123456',
        email: `user1@gmail.com`,
        role: 'user'
    },
    {
        id: 'adad',
        name: 'Nguyễn Văn Cường',
        password: '123456',
        email: `user3@gmail.com`,
        role: 'user'
    },
    {
        id: 'adasdasdsdsa',
        name: 'Nguyễn Văn Dũng',
        password: '123456',
        email: `user4@gmail.com`,
        role: 'user'
    },
    {
        id: 'aaaaaaa',
        name: 'Nguyễn Thị Thủy',
        password: '123456',
        email: `user5@gmail.com`,
        role: 'admin'
    },
]
export const coupons = [
    {
        code: 'TET',
        expiry: Date.now() + 5 * 24 * 3600000,
        discount: 15
    },
    {
        code: 'HOLI',
        expiry: Date.now() + 7 * 24 * 3600000,
        discount: 10
    },
    {
        code: 'FESTIVAL',
        expiry: Date.now() + 2 * 24 * 3600000,
        discount: 5
    }
]
export default userData