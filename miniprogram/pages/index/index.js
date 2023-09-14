Page({
  data: {
    touchStartTime: 0,
    touchEndTime: 1694573918098,
    touchDuration: 220,
    absolute: '',
    animation: [],
    currentCardOption: 0,
    currentItem: null,
    currentItemIndex: 0,
    currentCardPosition: {
      x: 35,
      y: 20
    },
    currentHideClass: '',
    like: false,
    dislike: false,
    isDelete: false,
    isFit: false,
    list: [],
    hidden: false,
    titleBarHeight: 0,
    statusBarHeight: 0,
    rotate: 0,
    position: '',
  },

  fetchData() {

    var data = [];

    for (var i = 1; i <= 10; i++) {
      var entry = {
        "id": i,
        "type": "image",
        "url": `https://picsum.photos/300/600?random=${i}`,
        "title": `Card ${i}`,
        "subtitle": `Card ${i} Subtitle`,
        "description": `Card ${i} Description`,
        "navigateUrl": `/pages/index/index?id=${i}`
      };
      data.push(entry);
    }

    this.setData({
      list: data
    })

  },

  reload() {
    this.fetchData()
    this.setData({
      hidden: false,
    })
  },

  onReady() {

    const {
      titleBarHeight,
      statusBarHeight,
    } = my.getSystemInfoSync();

    this.setData({
      titleBarHeight,
      statusBarHeight,
      currentCardPosition: {
        x: 35,
        y: 0
      },
    });

    my.setCanPullDown({
      canPullDown: false,
    });

    this.fetchData()
  },

  onTouchStart(e) {
    this.setData({
      touchStartTime: e.timeStamp
    });
  },

  onSwiperChange(e) {
    const {
      windowWidth
    } = my.getSystemInfoSync();

    const swipe = Math.ceil(e.changedTouches[0].x)
    const rotate = Math.ceil(((windowWidth / 2) - swipe) * -1)

    if (rotate >= -200 && rotate <= 200) {
      if (rotate < 0) {

        this.setData({
          position: "transform-origin: bottom left;",
          absolute: "right: 0;"
        });
      }

      if (rotate > 0) {
        this.setData({
          position: "transform-origin: bottom right;",
          absolute: "left: 0;"
        });
      }
      this.setData({
        rotate: rotate,
      });

      if (rotate > 30) {
        this.setData({
          rotate: 30,
          position: "transform-origin:right bottom;",
          currentCardOption: 1,
          currentCardPosition: {
            x: 50,
            y: 0
          },
          like: true,
          dislike: false,
        });
      } else if (rotate < -30) {
        this.setData({
          rotate: -30,
          position: "transform-origin:left bottom;",
          currentCardPosition: {
            x: 50,
            y: 0
          },
          currentCardOption: -1,
          dislike: true,
          like: false,
        });
      } else {
        this.setData({
          currentCardOption: 0,
          dislike: false,
          like: false,
          currentCardPosition: {
            x: 50,
            y: 0
          },
        });
      }
    }
  },


  onEndSwipe(e) {

    setTimeout(() => {
      this.setData({
        touchEndTime: e.timeStamp,
        touchDuration: e.timeStamp - this.data.touchStartTime,
        rotate: 0,
        currentCardOption: 0,
        currentHideClass: '',
        absolute: "left: 0;",
        dislike: false,
        like: false
      })
    }, 100);


    const {
      windowWidth
    } = my.getSystemInfoSync();

    const touchDuration = this.data.touchDuration

    const swipe = Math.ceil(e.changedTouches[0].x)
    const rotate = Math.ceil(((windowWidth / 2) - swipe) * -1)

    if (touchDuration > 200) {
      if (rotate <= -45) {
        this.data.list.shift()

        this.setData({
          hidden: true,
          list: this.data.list,
          currentCardPosition: {
            x: 34,
            y: 0
          },
        })

      } else if (rotate >= 45) {

        this.data.list.shift()

        this.setData({
          hidden: true,
          list: this.data.list,
          currentCardPosition: {
            x: 34,
            y: 0
          },
          currentCardOption: 1,
        })
      }
    }
  },

  handleSwipeLeft() {
    this.data.list.shift()

    this.setData({
      currentCardOption: -1,
      currentHideClass: 'card-hide-left',
      isDelete: true,
    })

    setTimeout(() => {
      this.setData({
        currentCardOption: 0,
        currentHideClass: '',
        hidden: true,
        isDelete: false,
        list: this.data.list
      })
    }, 500);


    if (!this.data.list.length) {
      this.reload()
    }
  },

  handleSwipeRight() {
    this.data.list.shift()

    this.setData({
      currentCardOption: 1,
      currentHideClass: 'card-hide-right',
      isFit: true,
    })

    setTimeout(() => {
      this.setData({
        currentCardOption: 0,
        currentHideClass: '',
        hidden: true,
        isFit: false,
        list: this.data.list
      });
    }, 500);

    if (!this.data.list.length) {
      this.reload()
    }
  }

})