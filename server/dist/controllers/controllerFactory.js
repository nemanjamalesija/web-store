var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import catchAsync from '../helpers/catchAsync.js';
import AppError from '../helpers/appError.js';
const getAll = (Model) =>
  catchAsync((req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      // To allow for nested GET reviews on product
      let filter = {};
      if (req.params.productId) filter = { product: req.params.productId };
      const doc = yield Model.find(filter);
      // SEND RESPONSE
      res.status(200).json({
        status: 'sucess',
        length: doc.length,
        data: { doc },
      });
    })
  );
const getOne = (Model, populateField) =>
  catchAsync((req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const doc = yield Model.findById(req.params.id).populate(populateField);
      if (!doc) {
        const error = new AppError('There is no document with that ID', 404);
        return next(error);
      }
      res.status(200).json({
        status: 'sucess',
        data: { doc },
      });
    })
  );
const createOne = (Model) =>
  catchAsync((req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const doc = yield Model.create(req.body);
      res.status(201).json({
        status: 'sucess',
        data: { doc },
      });
    })
  );
const updateOne = (Model) =>
  catchAsync((req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const doc = yield Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!doc) {
        const error = new AppError('No document found with that ID', 404);
        return next(error);
      }
      res.status(201).json({
        status: 'sucess',
        data: {
          data: doc,
        },
      });
    })
  );
const deleteOne = (Model) =>
  catchAsync((req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const doc = yield Model.findByIdAndDelete(req.params.id);
      if (!doc) {
        const error = new AppError('No document found with that ID', 404);
        return next(error);
      }
      res.status(204).json({
        status: 'sucess',
        data: null,
      });
    })
  );
export default { getAll, createOne, updateOne, deleteOne, getOne };
