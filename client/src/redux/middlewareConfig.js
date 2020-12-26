const middlewareConfig = {
  interceptors: {
    request: [
      {
        success: function({ getState, dispatch, getSourceAction }, req) {
          // console.log(req); //contains information about request object
          //...
          return req;
        },
        error: function({ getState, dispatch, getSourceAction }, error) {
          //...
          //  console.log(error);
          return error;
        }
      }
    ],
    response: [
      {
        success: function({ getState, dispatch, getSourceAction }, res) {
          // console.log(res); //contains information about request object
          //...
          return Promise.resolve(res);
        },
        error: function({ getState, dispatch, getSourceAction }, error) {
          return Promise.reject(error);
        }
      }
    ]
  }
};

export default middlewareConfig;
