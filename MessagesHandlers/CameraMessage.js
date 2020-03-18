const { GeneralMessage, messageType } = require("./GeneralMessageBase");
/**
 * Class representing Matrix cabinet message
 * @extends GeneralMessage
 */
class CameraMessage extends GeneralMessage {
  /**
   * Create the message that will be sent to .Net.
   * @param {string} MessageId Id for sync.
   * @param {messageType} MessageType Type of message (Cabinet, Camera, Identification).
   * @param {{CameraType: CameraType, IP: string, Port:number, UserName: string, Password: string, FilePath: string, BackFilePath: string, FileType: string, FileName: string}} CameraData
   * @param {cameraMessageType} CameraMessageType
   * @param {cameraStatusResponse} cameraStatusResponse
   * @param {boolean} ReplaceCamera
  
   */
  constructor(
    MessageId,
    MessageType,
    CameraMessageType,
    CameraData,
    ReplaceCamera = false,
    CabinetStatusResponse = "None"
  ) {
    super(MessageId, MessageType);
    this.CameraData = CameraData;
    this.CabinetStatusResponse = CabinetStatusResponse;
    this.CameraMessageType = CameraMessageType;
    this.ReplaceCamera = ReplaceCamera;
  }
}

const cameraMessageType = Object.freeze({
  LOGIN: "Login",
  START_RECORDING: "StartRecording",
  STOP_RECORDING: "StopRecording"
});

const cameraStatusResponse = Object.freeze({
  RECORDING_STARTED: "RecordingStarted",
  RECORDING_ENDED: "RecordingEnded",
  ERROR: "Error",
  NONE: "None"
});

const CameraType = Object.freeze({
  AXIS: "Axis",
  HIKVISION: "HIKVision"
});

module.exports = {
  CameraMessage,
  messageType,
  cameraMessageType,
  cameraStatusResponse,
  CameraType
};
