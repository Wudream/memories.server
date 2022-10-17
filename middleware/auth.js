import jwt from "jsonwebtoken";

const secret = 'test'

const auth = async (req, res, next) => {
    try {
        // 获取令牌
        const token = req.headers.authorization?.split(" ")[1]
        // 验证是用户登录不是谷歌登录
        const isCustomAuth = token?.length < 500
        // 解码器
        let decodedData;

        if (token && isCustomAuth) {
            // 用户获得自己的id方式
            // 解码后获得数据
            decodedData = jwt.verify(token, secret);
            // 将获得的id存储在用户中
            req.userId = decodedData?.id
        } else {
            // 谷歌获得id方式
            decodedData = jwt.decode(token)

            req.userId = decodedData?.sub
        }
        // 调用下一个
        next()
    } catch (error) {
        console.log(error);
    }
}

export default auth
