/**
 * Class base object to sent to .Net
 */
module.exports.GeneralMessage = class {
  /**
   * Base params.
   * @param {string} MessageId Id for sync.
   * @param {messageType} MessageType Type of message (Cabinet, Camera, Identification).
   */
  constructor(MessageId, MessageType) {
    // always initialize all instance properties
    this.MessageId = MessageId;
    this.MessageType = MessageType;
  }
};

module.exports.messageType = Object.freeze({
  MATRIX_CABINET: "MatrixCabinet",
  MATRIX_CAMERA: "MatrixCamera",
  MATRIX_IDENTIFICATION: "MatrixIdentification"
});
