var WebSocketClient = require("websocket").client;

const client = new WebSocketClient();
let connection;

/**
 * @function createWebSocket
 * @param {function()} onConnectHandler - Event function
 * @param {function(Error)} onErrorHandler - Event function
 * @param {function()} onCloseHandler - Event function
 * @param {function(string)} onMessageHandler - Event function
 * @return {{connect: connect, send: send,abort: abort}}
 */
const createWebSocket = (onConnectHandler, onErrorHandler, onCloseHandler, onMessageHandler) => {
  let connectionSucceed;
  let connectionFailed;

  client.on("connectFailed", function (error) {
    if (connectionFailed) 
      connectionFailed(error || new Error("connection failed"));
    }
  );

  client.on("connect", function (newConnection) {
    connection = newConnection;
    if (connectionSucceed) 
      connectionSucceed();
    if (onConnectHandler) 
      onConnectHandler();
    connection
      .on("error", function (error) {
        if (onErrorHandler) 
          onErrorHandler(error || new Error("connection error"));
        }
      );
    connection.on("close", function () {
      if (onCloseHandler) 
        onCloseHandler();
      }
    );
    connection.on("message", function (message) {
      if (message.type === "utf8") {
        console.log(message.utf8Data);
        if (onMessageHandler) 
          onMessageHandler(message.utf8Data);
        }
      });
  });
  /**
   * @function connect
   * @param {string} ip
   * @param {string} port
   * @returns {Promise.<void|Error>}
   */
  const connect = (ip, port) => {
    return new Promise((resolve, reject) => {
      connectionSucceed = () => resolve();
      connectionFailed = error => reject(error);
      client.connect(`ws://${ip}:${port}/`);
    });
  };
  /**
   * @function send
   * @param {string} message
   * @returns {void}
   */
  const send = message => {
    connection.sendUTF(message);
  };
  /**
   * @function abort
   * @returns {void}
   */
  const abort = () => {
    client.abort();
  };

  return {connect, send, abort};
};

module.exports = createWebSocket;
