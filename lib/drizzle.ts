import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import path from 'path';
import os from 'os';
import { sqliteTable, integer, real, text } from 'drizzle-orm/sqlite-core';

const dbPath = path.join(os.homedir(), 'mh-digital-salon-pos.db');
const sqlite = new Database(dbPath);
export const drizzleDb = drizzle(sqlite);

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  username: text('username').notNull(),
  password: text('password'),
  passwordHash: text('passwordHash'),
  passwordSalt: text('passwordSalt'),
  role: text('role').notNull(),
  permissions: text('permissions'),
  isActive: integer('isActive', { mode: 'boolean' }).notNull().default(true),
  createdAt: text('createdAt').notNull(),
  updatedAt: text('updatedAt').notNull(),
});

export const services = sqliteTable('services', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  category: text('category').notNull(),
  price: real('price').notNull(),
  duration: integer('duration'),
  isActive: integer('isActive', { mode: 'boolean' }).notNull().default(true),
  isDemo: integer('isDemo', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('createdAt').notNull(),
  updatedAt: text('updatedAt').notNull(),
});

export const customers = sqliteTable('customers', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  phone: text('phone').notNull(),
  email: text('email'),
  gender: text('gender'),
  dob: text('dob'),
  notes: text('notes'),
  loyaltyPoints: real('loyaltyPoints').notNull().default(0),
  isDemo: integer('isDemo', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('createdAt').notNull(),
  updatedAt: text('updatedAt').notNull(),
});

export const sales = sqliteTable('sales', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  receiptNumber: text('receiptNumber').notNull(),
  isDemo: integer('isDemo', { mode: 'boolean' }).notNull().default(false),
  customerId: integer('customerId').notNull(),
  customerName: text('customerName').notNull(),
  items: text('items').notNull(),
  subtotal: real('subtotal').notNull(),
  discount: real('discount').notNull(),
  tax: real('tax').notNull(),
  total: real('total').notNull(),
  totalPaid: real('totalPaid').notNull(),
  balance: real('balance').notNull(),
  tipAmount: real('tipAmount'),
  status: text('status').notNull(),
  transactionStatus: text('transactionStatus').notNull(),
  payments: text('payments').notNull(),
  cashierId: text('cashierId').notNull(),
  cashierName: text('cashierName').notNull(),
  notes: text('notes'),
  voidReason: text('voidReason'),
  voidedAt: text('voidedAt'),
  voidedBy: text('voidedBy'),
  refundAmount: real('refundAmount'),
  refundReason: text('refundReason'),
  refundedAt: text('refundedAt'),
  refundedBy: text('refundedBy'),
  createdAt: text('createdAt').notNull(),
  updatedAt: text('updatedAt').notNull(),
});

export const inventory = sqliteTable('inventory', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  type: text('type').notNull(),
  name: text('name').notNull(),
  category: text('category').notNull(),
  sku: text('sku'),
  barcode: text('barcode'),
  supplierId: integer('supplierId'),
  costPrice: real('costPrice').notNull(),
  sellingPrice: real('sellingPrice').notNull(),
  currentStock: real('currentStock').notNull(),
  minimumStock: real('minimumStock').notNull(),
  expiryDate: text('expiryDate'),
  isActive: integer('isActive', { mode: 'boolean' }).notNull().default(true),
  isDemo: integer('isDemo', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('createdAt').notNull(),
  updatedAt: text('updatedAt').notNull(),
});

export const settings = sqliteTable('settings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  salonName: text('salonName').notNull(),
  address: text('address').notNull(),
  phone: text('phone').notNull(),
  email: text('email').notNull(),
  logoUrl: text('logoUrl'),
  currency: text('currency').notNull(),
  taxRate: real('taxRate').notNull(),
  taxEnabled: integer('taxEnabled', { mode: 'boolean' }).notNull().default(false),
  receiptFooter: text('receiptFooter'),
  expenseLimits: text('expenseLimits'),
  staffPositions: text('staffPositions'),
  serviceCategories: text('serviceCategories'),
  membershipPlans: text('membershipPlans'),
  expenseCategories: text('expenseCategories'),
  updatedAt: text('updatedAt').notNull(),
});

export const bookings = sqliteTable('bookings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  isDemo: integer('isDemo', { mode: 'boolean' }).notNull().default(false),
  customerId: integer('customerId').notNull(),
  customerName: text('customerName').notNull(),
  type: text('type').notNull(),
  status: text('status').notNull(),
  bookingDate: text('bookingDate').notNull(),
  startTime: text('startTime').notNull(),
  endTime: text('endTime').notNull(),
  services: text('services').notNull(),
  staffId: integer('staffId'),
  staffName: text('staffName'),
  notes: text('notes'),
  createdBy: text('createdBy'),
  createdAt: text('createdAt').notNull(),
  updatedAt: text('updatedAt').notNull(),
  completedAt: text('completedAt'),
  cancelledAt: text('cancelledAt'),
  cancelledBy: text('cancelledBy'),
});

export const moduleRecords = sqliteTable('moduleRecords', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  module: text('module').notNull(),
  title: text('title').notNull(),
  status: text('status').notNull(),
  customerId: integer('customerId'),
  staffId: integer('staffId'),
  amount: real('amount'),
  quantity: real('quantity'),
  data: text('data').notNull(),
  createdAt: text('createdAt').notNull(),
  updatedAt: text('updatedAt').notNull(),
});

export const auditLogs = sqliteTable('auditLogs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('userId').notNull(),
  username: text('username').notNull(),
  action: text('action').notNull(),
  details: text('details').notNull(),
  timestamp: text('timestamp').notNull(),
});

sqlite.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT,
    passwordHash TEXT,
    passwordSalt TEXT,
    role TEXT,
    permissions TEXT,
    isActive INTEGER DEFAULT 1,
    createdAt TEXT,
    updatedAt TEXT
  );

  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    category TEXT,
    price REAL,
    duration INTEGER,
    isActive INTEGER,
    isDemo INTEGER,
    createdAt TEXT,
    updatedAt TEXT
  );

  CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    phone TEXT,
    email TEXT,
    gender TEXT,
    dob TEXT,
    notes TEXT,
    loyaltyPoints REAL,
    isDemo INTEGER,
    createdAt TEXT,
    updatedAt TEXT
  );

  CREATE TABLE IF NOT EXISTS sales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    receiptNumber TEXT,
    isDemo INTEGER,
    customerId INTEGER,
    customerName TEXT,
    items TEXT,
    subtotal REAL,
    discount REAL,
    tax REAL,
    total REAL,
    totalPaid REAL,
    balance REAL,
    tipAmount REAL,
    status TEXT,
    transactionStatus TEXT,
    payments TEXT,
    cashierId TEXT,
    cashierName TEXT,
    notes TEXT,
    voidReason TEXT,
    voidedAt TEXT,
    voidedBy TEXT,
    refundAmount REAL,
    refundReason TEXT,
    refundedAt TEXT,
    refundedBy TEXT,
    createdAt TEXT,
    updatedAt TEXT
  );

  CREATE TABLE IF NOT EXISTS inventory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT,
    name TEXT,
    category TEXT,
    sku TEXT,
    barcode TEXT,
    supplierId INTEGER,
    costPrice REAL,
    sellingPrice REAL,
    currentStock REAL,
    minimumStock REAL,
    expiryDate TEXT,
    isActive INTEGER,
    isDemo INTEGER,
    createdAt TEXT,
    updatedAt TEXT
  );

  CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    salonName TEXT,
    address TEXT,
    phone TEXT,
    email TEXT,
    logoUrl TEXT,
    currency TEXT,
    taxRate REAL,
    taxEnabled INTEGER,
    receiptFooter TEXT,
    expenseLimits TEXT,
    staffPositions TEXT,
    serviceCategories TEXT,
    membershipPlans TEXT,
    expenseCategories TEXT,
    updatedAt TEXT
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    isDemo INTEGER,
    customerId INTEGER,
    customerName TEXT,
    type TEXT,
    status TEXT,
    bookingDate TEXT,
    startTime TEXT,
    endTime TEXT,
    services TEXT,
    staffId INTEGER,
    staffName TEXT,
    notes TEXT,
    createdBy TEXT,
    createdAt TEXT,
    updatedAt TEXT,
    completedAt TEXT,
    cancelledAt TEXT,
    cancelledBy TEXT
  );

  CREATE TABLE IF NOT EXISTS moduleRecords (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    module TEXT,
    title TEXT,
    status TEXT,
    customerId INTEGER,
    staffId INTEGER,
    amount REAL,
    quantity REAL,
    data TEXT,
    createdAt TEXT,
    updatedAt TEXT
  );

  CREATE TABLE IF NOT EXISTS auditLogs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId TEXT,
    username TEXT,
    action TEXT,
    details TEXT,
    timestamp TEXT
  );
`);

export { sqlite };
export default drizzleDb;
