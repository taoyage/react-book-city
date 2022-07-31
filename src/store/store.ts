import { Middleware } from '@reduxjs/toolkit';
import configStore from '@/store/configStore';

const middlewares: Middleware[] = [];

const rootReducers = {};

export const store = configStore(rootReducers, middlewares);
