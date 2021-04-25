const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils')
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');
const InviteCode = mongoose.model('InviteCode');

const router = new Router({
    prefix:'/auth',
});

router.post('/register',async (ctx) => {
    const {
        account,
        password,
        inviteCode,
    } = getBody(ctx);

    //表单校验
    if (account === '' || password === '' || inviteCode === '') {
        ctx.body = {
            code: 0,
            msg: '字段不能为空',
            data: null,
        };

        return;
    }

    //判断邀请码
    const findCode = await InviteCode.findOne({
        code: inviteCode,
    }).exec();

    //若无此邀请码 或 邀请码已被使用
    if ((!findCode) || findCode.user) {
        ctx.body = {
            code: 0,
            msg: '邀请码不正确',
            data: null,
        };

        return;
    }

    //去找 account 为 传递上来的 "account" 的用户
    const findUser = await User.findOne({
        account,
    }).exec();

    //判断有无此用户
    if (findUser) {
        //若有 表示已存在
        ctx.body = {
            code: 0,
            msg: '用户已存在',
            data: null,
        };
        
        return;
    }

    //创建一个用户
    const user = new User({
        account,
        password,
    });

    //将创建的用户同步至mongodb
    const res = await user.save();

    findCode.user = res._id;
    findCode.modifiedPaths.updateAt = new Date().getTime();

    await findCode.save();

    //响应成功
    ctx.body = {
        code: 1,
        msg: '注册成功',
        data: res,
    };
});

router.post('/login',async (ctx) => {
    const {
        account,
        password,
    } = getBody(ctx);

    if (account === '' || password === '') {
        ctx.body = {
            code: 0,
            msg: '字段不能为空',
            data: null,
        };

        return;
    }

    const one = await User.findOne({
        account,
    }).exec();

    if (!one) {
        ctx.body = {
            code: 0,
            msg:'用户名或密码错误',
            data: null,
        };

        return;
    }

    const user = {
        account: one.account,
        _id: one._id,
    }

    if (one.password === password) {
        ctx.body = {
            code: 1,
            msg:'登入成功',
            data: {
                user,
                token: jwt.sign(user,'blog'),
            },
        };

        return;
    };

    ctx.body = {
        code: 0,
        msg:'用户名或密码错误',
        data: null,
    };

    console.log(one);
});

module.exports = router;