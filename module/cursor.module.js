function CursorModule() {
    // 属性
    this.fileName = '';
    /**
     *      menu    -   0
     *      post    -   1
     *      list    -   2
     *      button  -   3
     *      more    -   4
     *      bar     -   5
     *      swiper  -   6
     */
    this.focusArea = 0;
    this.bar = null;            //  菜单栏
    this.menu = null;           //  功能入口
    this.swiper = null;         //  滚动图片
    this.post = null;           //  海报
    this.list = null;           //  列表
    this.button = null;         //  按键
    this.more = null;           //  列表页
    this.monitor = null;        //  视频监控

    // 方法
    this.init = function () {
        var
            table,
            firstTR,
            lt, t, rt,
            secondTR,
            l, r,
            thirdTR,
            lb, b, rb;

        table = document.getElementById('cursor');

        firstTR = document.createElement('tr');
        lt = document.createElement('td');
        t = document.createElement('td');
        rt = document.createElement('td');
        lt.className = 'lt';
        t.className = 't';
        rt.className = 'rt';
        firstTR.appendChild(lt);
        firstTR.appendChild(t);
        firstTR.appendChild(rt);

        secondTR = document.createElement('tr');
        l = document.createElement('td');
        r = document.createElement('td');
        l.className = 'l';
        r.className = 'r';
        secondTR.appendChild(l);
        secondTR.appendChild(document.createElement('td'));
        secondTR.appendChild(r);

        thirdTR = document.createElement('tr');
        lb = document.createElement('td');
        b = document.createElement('td');
        rb = document.createElement('td');
        lb.className = 'lb';
        b.className = 'b';
        rb.className = 'rb';
        thirdTR.appendChild(lb);
        thirdTR.appendChild(b);
        thirdTR.appendChild(rb);

        table.appendChild(firstTR);
        table.appendChild(secondTR);
        table.appendChild(thirdTR);
    };

    /**
     *  聚焦
     */
    this.focusOn = function () {
        var cursor = document.getElementById("cursor");
        var cursorTop = document.getElementsByClassName('t')[0];
        var cursorBottom = document.getElementsByClassName('b')[0];
        document.getElementById("debug-message").innerHTML += "<br/>" + "cursor.module.js ==> focusOn | focusArea: " + this.focusArea;
        document.getElementById("debug-message").innerHTML += "<br/>" + "[Cursor] ScrollWidth: " + cursor.scrollWidth + " - ScrollHeight: " + cursor.scrollHeight;
        switch (this.focusArea) {
            case 0:
                this.menu.focusOn(cursor);
                break;
            case 1:
                this.post.focusOn(cursor);
                break;
            case 2:
                this.list.focusOn(cursor);
                break;
            case 3:
                this.button.focusOn(cursor);
                break;
            case 4:
                this.more.focusOn(cursor);
                break;
            case 5:
                this.bar.focusOn();
                break;
            case 6:
                this.swiper.focusOn();
                break;
            default:
                break;
        }
    };

    /**
     *  失焦
     */
    this.focusOut = function () {
        var cursor = document.getElementById("cursor");

        switch (this.focusArea) {
            case 0:
                this.menu.focusOut(cursor);
                break;
            case 1:
                this.post.focusOut(cursor);
                break;
            case 2:
                this.list.focusOut(cursor);
                break;
            case 3:
                this.button.focusOut(cursor);
                break;
            case 4:
                this.more.focusOut(cursor);
                break;
            case 5:
                this.bar.focusOut();
                break;
            case 6:
                this.swiper.focusOut();
                break;
            default:
                break;
        }
    };
}
