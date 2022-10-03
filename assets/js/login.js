$(function() {
    //点击去注册链接
    $('#link_reg').on('click', function() {

            $('.register-box').show()
            $('.login-box').hide()
        })
        //点击去登录链接
    $('#link_login').on('click', function() {
            $('.register-box').hide()
            $('.login-box').show()
        })
        //从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
        //自定义一个pwd校验规则
    form.verify({
            pwd: [/^[\S]{6,12}$/, '密码必须6到12位，不能有空格'],

            //通过形参拿到确认密码中的值
            repwd: function(value) {
                //定义pwd拿到密码中的值
                //下面.register-box [name=password]；.register-box与[name=password]之间得有个空格
                var pwd = $('.register-box [name=password]').val();
                //进行比较
                // console.log(value);
                // console.log(pwd);


                if (pwd !== value) {
                    return '两次密码不一致'
                }
            }
        })
        //监听注册表单的提交事件



    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        console.log('999999999999');


        var data = {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val(),
            }
            // alert($('#form_reg [name=username]').val());
            // alert($('#form_reg [name=password]').val());
            // alert($('#form_reg [name=repassword]').val());

        // alert('000000000000000000000');
        // alert(data.username);
        // alert(data.password);

        $.post('/api/reguser', data, function(res) {

            if (res.status !== 0) {
                return layer.msg(res.message);


            }
            layer.msg('注册成功');
            //模拟人的点击
            $('#link_login').click()

        })


    })
    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'post',
            //快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败!')
                }
                layer.msg('登录成功！')
                    //将登录成功得到得token字符串，保存到localstorage本地存储中
                localStorage.setItem('token', res.token)
                    // console.log(res.token);
                    //跳转到后台
                self.location.href = '/index.html'

            }
        })

    })

})