export const queryFace = () => {
  return Promise.resolve({
    status: 200,
    message: "ok",
    data: {
      image: "", //识别人脸背景图片
      witdh: "", // 图片宽度
      hegith: "", //图片高度
      //人脸数据集合
      list: [
        {
          id: 1, //唯一标识
          gender: 1, // 性别表示
          scacle: 1, //距离缩放表示
          location: {
            x: "", //人脸的x坐标
            y: "", //人脸的y坐标
          },
        },
      ],
    },
  });
};
