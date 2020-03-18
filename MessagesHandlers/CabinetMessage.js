const { GeneralMessage, messageType } = require("./GeneralMessageBase");
/**
 * Class representing Matrix cabinet message
 * @extends GeneralMessage
 */
class CabinetMessage extends GeneralMessage {
  /**
   * Create the message that will be sent to .Net.
   * @param {string} MessageId Id for sync.
   * @param {messageType} MessageType Type of message (Cabinet, Camera, Identification).
   * @param {cabinetMessageType} CabinetMessageType
   * @param {Array.<{IP: string, Port:string, Drawer: number, BinType:string, XColumn:number, YRow:number, WidthOfCell:number}>} MessageBinsData
   * @param {cabinetStatusResponse} CabinetStatusResponse
   */
  constructor(
    MessageId,
    MessageType,
    CabinetMessageType,
    MessageBinsData,
    CabinetStatusResponse = cabinetStatusResponse.NONE
  ) {
    super(MessageId, MessageType);
    this.CabinetMessageType = CabinetMessageType;
    this.CabinetStatusResponse = CabinetStatusResponse;
    this.MessageBinsData = MessageBinsData;
  }
}
const cabinetMessageType = Object.freeze({
  CHECK_IF_CONNECTED: "CheckIfConnected",
  CHECK_DRAWER_STATUS: "CheckDrawerStatus",
  OPEN_DRAWER: "OpenDrawer",
  OPEN_BINS_AND_DRAWER: "OpenBinsAndDrawer",
  DISCONNECT: "Disconnect"
});
const cabinetStatusResponse = Object.freeze({
  NONE: "None",
  CONNECTED: "Connected",
  DISCONNECTED: "Disconnected",
  ALL_DRAWERS_CLOSED: "AllDrawersClose",
  READY: "Ready",
  DRAWER_OPEN: "DrawerOpen",
  DRAWER_CLOSED: "DrawerClosed",
  ERROR: "Error",
  REJECT: "Reject",
  DRAWER_REMAINED_CLOSED: "DrawerRemainedClosed",
  CTRL_VERSION: "CtrlVersion"
});

module.exports = {
  CabinetMessage,
  messageType,
  cabinetMessageType,
  cabinetStatusResponse
};
