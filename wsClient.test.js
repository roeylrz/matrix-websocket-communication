const createWebSocket = require("./wsClient");
const { getMockData } = require("./tests/db/contantMocks");

var {
  CabinetMessage,
  messageType,
  cabinetMessageType
} = require("./MessagesHandlers/CabinetMessage");
var {
  CameraMessage,
  cameraMessageType,
  cameraStatusResponse,
  CameraType
} = require("./MessagesHandlers/CameraMessage");
var {
  IdentificationMessage,
  identificationMessageType,
  identificationStatusResponse,
  deviceType
} = require("./MessagesHandlers/IdentificationMessage");

jest.setTimeout(60000);
const mockOnConnectHandler = jest.fn();
const mockOnErrorHandler = jest.fn();
const mockOnCloseHandler = jest.fn();
const mockOnMessageHandler = jest.fn();

const { send, connect, abort } = createWebSocket(
  mockOnConnectHandler,
  mockOnErrorHandler,
  mockOnCloseHandler,
  mockOnMessageHandler
);

describe("Test Messages", () => {
  beforeAll(async () => {
    await connect("localhost", "8088");
  });
  afterEach(done => {
    setTimeout(() => {
      done();
    }, 200);
  });
  /*
  describe("Test Cabinet Message", () => {
    test("test if connected", () => {
      expect(mockOnConnectHandler).toHaveBeenCalledTimes(1);
    });

    test("test cabinet", done => {
      const cabinetMessage = new CabinetMessage(
        "123",
        messageType.MATRIX_CABINET,
        cabinetMessageType.OPEN_BINS_AND_DRAWER,
        [
          {
            IP: "192.168.127.100",
            Port: "8001",
            Drawer: 1,
            BinType: "Regular",
            XColumn: 1,
            YRow: 1,
            WidthOfCell: 2
          },
          {
            IP: "192.168.127.100",
            Port: "8001",
            Drawer: 1,
            BinType: "Regular",
            XColumn: 3,
            YRow: 1,
            WidthOfCell: 2
          },
          {
            IP: "192.168.127.100",
            Port: "8001",
            Drawer: 1,
            BinType: "Regular",
            XColumn: 5,
            YRow: 1,
            WidthOfCell: 2
          },
          {
            IP: "192.168.127.100",
            Port: "8001",
            Drawer: 1,
            BinType: "Regular",
            XColumn: 7,
            YRow: 1,
            WidthOfCell: 2
          },
          {
            IP: "192.168.127.100",
            Port: "8001",
            Drawer: 1,
            BinType: "Regular",
            XColumn: 9,
            YRow: 1,
            WidthOfCell: 2
          }
        ]
      );
      send(JSON.stringify(cabinetMessage));
      setTimeout(() => {
        cabinetMessage.CabinetMessageType = "Disconnect";
        send(JSON.stringify(cabinetMessage));
        expect(mockOnMessageHandler).toHaveBeenCalled();
        setTimeout(() => {
          done();
        }, 2000);
      }, 10000);
    });
  });
  */
  /*
  describe("Camera: ", () => {
    beforeAll(done => {
      const cameraMessage = new CameraMessage(
        "123",
        messageType.MATRIX_CAMERA,
        cameraMessageType.LOGIN,
        {
          CameraType: CameraType.AXIS,
          IP: "192.168.127.96",
          Port: 80,
          UserName: "root",
          Password: "matrix",
          FilePath:
            "C://KeyTag//Matrix 2.0//TestsFiles//MatrixService//Camera//Records",
          BackFilePath: "",
          FileType: "asf",
          FileName: "test - axis - 1"
        },
        false,
        cameraStatusResponse.NONE
      );
      send(JSON.stringify(cameraMessage));
      setTimeout(() => {
        done();
      }, 200);
    });

    afterAll(done => {
      setTimeout(() => {
        const cameraMessage = new CameraMessage(
          "123",
          messageType.MATRIX_CAMERA,
          cameraMessageType.STOP_RECORDING,
          {
            CameraType: CameraType.AXIS,
            IP: "192.168.127.96",
            Port: 80,
            UserName: "root",
            Password: "matrix",
            FilePath:
              "C://KeyTag//Matrix 2.0//TestsFiles//MatrixService//Camera//Records",
            BackFilePath: "",
            FileType: "asf",
            FileName: "test - axis - 1"
          },
          false,
          cameraStatusResponse.NONE
        );
        send(JSON.stringify(cameraMessage));
        setTimeout(() => {
          done();
        }, 2000);
      }, 2000);
    });

    test("should record", done => {
      const cameraMessage = new CameraMessage(
        "123",
        messageType.MATRIX_CAMERA,
        cameraMessageType.START_RECORDING,
        {
          CameraType: CameraType.AXIS,
          IP: "192.168.127.96",
          Port: 80,
          UserName: "root",
          Password: "matrix",
          FilePath:
            "C://KeyTag//Matrix 2.0//TestsFiles//MatrixService//Camera//Records",
          BackFilePath: "",
          FileType: "asf",
          FileName: "test - axis - 1"
        },
        false,
        cameraStatusResponse.NONE
      );
      send(JSON.stringify(cameraMessage));
      setTimeout(() => {
        expect(mockOnMessageHandler).toHaveBeenCalled();
        done();
      }, 5000);
    });
  });
*/
  describe("Identification: ", () => {
    test("should create message", done => {
      const identificationMessage = new IdentificationMessage(
        "123",
        messageType.MATRIX_IDENTIFICATION,
        identificationMessageType.CONNECT,
        [
          {
            IdentificationStatusResponse: identificationStatusResponse.NONE,
            DeviceType: deviceType.PCPROX_PROXIMITY_READER
          },
          {
            IdentificationStatusResponse: identificationStatusResponse.NONE,
            DeviceType: deviceType.KEYBOARD_EMULATOR
          }
        ],
        null,
        identificationStatusResponse.NONE
      );
      send(JSON.stringify(identificationMessage));
      const jsonMessage = JSON.parse(
        `{"IdentificationStatusResponse":"Connected","ReceivedData":null,"IdentificationMessageType":"Connect","Devices":[{"IdentificationStatusResponse":"Connected","DeviceType":"PcProxProximityCard"},{"IdentificationStatusResponse":"Connected","DeviceType":"KeyboardEmulator"}],"MessageId":"123","MessageType":"MatrixIdentification"}`
      );
      setTimeout(() => {
        const input =
          mockOnMessageHandler.mock.calls[
            mockOnMessageHandler.mock.calls.length - 1
          ];
        expect(jsonMessage).toEqual(JSON.parse(input));
        done();
      }, 2000);
    });
  });
});
