"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/:userId', (req, res, next) => {
    // http://localhost:4040/api/v1/users/{{ userId }}
    const { userId } = req.params;
    res.json({
      userID3
    });
});
exports.default = router;
