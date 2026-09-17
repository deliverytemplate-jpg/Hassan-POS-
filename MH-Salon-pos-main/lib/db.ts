import Database from 'better-sqlite3';
import path from 'path';
import os from 'os';

export type UserRole =
  | 'Admin'
  | 'Supervisor'
  | 'Cashier';

export type Permission =
  | 'view_dashboard'
  | 'view_users'
  | 'create_users'
  | 'edit_users'
  | 'delete_users'
  | 'manage_permissions'
  | 'view_customers'
  | 'create_customers'
  | 'edit_customers'
  | 'delete_customers'
  | 'view_clinical_records'
  | 'manage_clinical_records'
  | 'view_services'
  | 'manage_services'
  | 'access_pos'
  | 'apply_discounts'
  | 'void_transactions'
  | 'refund_transactions'
  | 'reverse_transactions'
  | 'edit_transactions'
  | 'manage_cash_drawer'
  | 'view_reports'
  | 'manage_settings'
  | 'view_bookings'
  | 'create_bookings'
  | 'edit_bookings'
  | 'manage_booking_status'
  | 'manage_staff'
  | 'manage_commissions'
  | 'manage_expenses'
  | 'manage_inventory'
  | 'manage_suppliers'
  | 'manage_purchase_orders'
  | 'manage_packages'
  | 'manage_memberships'
  | 'manage_vouchers'
  | 'manage_loyalty'
  | 'manage_promotions'
  | 'manage_attendance'
  | 'manage_leave'
  | 'view_audit_logs'
  | 'manage_backups';

export type PaymentMethod =
  | 'Cash'
  | 'M-Pesa'
  | 'Card'
  | 'Bank Transfer'
  | 'Other'
  | 'Voucher';

export type PaymentStatus =
  | 'Unpaid'
  | 'Pending'
  | 'Partially Paid'
  | 'Paid'
  | 'Cancelled';

export type TransactionStatus =
  | 'Completed'
  | 'Voided'
  | 'Refunded'
  | 'Reversed';

export type ModuleName =
  | 'booking'
  | 'customer-record'
  | 'staff'
  | 'commission'
  | 'expense'
  | 'supplier'
  | 'purchase-order'
  | 'package'
  | 'membership'
  | 'voucher'
  | 'loyalty'
  | 'promotion'
  | 'attendance'
  | 'leave'
  | 'notification'
  | 'cash_drawer';

export interface Service {
  id?: number;
  name: string;
  category: string;
  price: number;
  duration?: number;
  isActive: boolean;
  isDemo?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id?: number;
  username: string;
  password?: string;
  passwordHash?: string;
  passwordSalt?: string;
  role: UserRole;
  permissions?: Permission[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Customer {
  id?: number;
  name: string;
  phone: string;
  email?: string;
  gender: string;
  dob?: string;
  notes: string;
  loyaltyPoints: number;
  isDemo?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClinicalRecord {
  id?: number;
  customerId: number;
  date: Date;
  recordType: 'Consultation' | 'Treatment' | 'Progress Note';
  staffId: number;
  serviceId?: number;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SaleItem {
  id: string;
  type: 'Service' | 'Product';
  serviceId?: number;
  productId?: number;
  name: string;
  price: number;
  quantity: number;
  staffId?: number;
  staffName?: string;
  discount: number;
  total: number;
}

export interface SalePayment {
  method: PaymentMethod;
  amount: number;
  reference?: string;
  cardLast4?: string;
  approvalCode?: string;
  date: Date;
}

export interface Sale {
  id?: number;
  receiptNumber: string;
  isDemo?: boolean;
  customerId: number;
  customerName: string;
  items: SaleItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  totalPaid: number;
  balance: number;
  tipAmount?: number;
  status: PaymentStatus;
  transactionStatus: TransactionStatus;
  payments: SalePayment[];
  cashierId: string;
  cashierName: string;
  notes?: string;
  voidReason?: string;
  voidedAt?: Date;
  voidedBy?: string;
  refundAmount?: number;
  refundReason?: string;
  refundedAt?: Date;
  refundedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuditLog {
  id?: number;
  userId: string;
  username: string;
  action: string;
  details: string;
  timestamp: Date;
}

export interface InventoryItem {
  id?: number;
  type: 'Retail' | 'Operational';
  name: string;
  category: string;
  sku?: string;
  barcode?: string;
  supplierId?: number;
  costPrice: number;
  sellingPrice: number;
  currentStock: number;
  minimumStock: number;
  expiryDate?: Date;
  isActive: boolean;
  isDemo?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface InventoryMovement {
  id?: number;
  productId: number;
  type: 'Stock In' | 'Sale' | 'Consumption' | 'Adjustment' | 'Return';
  quantity: number;
  beforeQty: number;
  afterQty: number;
  userId: string;
  reason: string;
  date: Date;
}

export interface SystemSettings {
  id?: number;
  salonName: string;
  address: string;
  phone: string;
  email: string;
  logoUrl?: string;
  currency: string;
  taxRate: number;
  taxEnabled: boolean;
  receiptFooter: string;
  expenseLimits: Record<string, number>;
  staffPositions?: string[];
  serviceCategories?: string[];
  membershipPlans?: string[];
  expenseCategories?: string[];
  updatedAt: Date;
}

export interface Booking {
  id?: number;
  isDemo?: boolean;
  customerId: number;
  customerName: string;
  type: 'Walk-in' | 'Appointment';
  status: 'Booked' | 'Confirmed' | 'Waiting' | 'In Progress' | 'Completed' | 'Cancelled' | 'No Show';
  bookingDate: Date;
  startTime: string;
  endTime: string;
  services: { serviceId: number; name: string; price: number; staffId?: number }[];
  staffId?: number;
  staffName?: string;
  notes?: string;
  createdBy?: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  cancelledAt?: Date;
  cancelledBy?: string;
}

export interface HeldSale {
  id?: number;
  holdId: string;
  customerId?: number;
  customerName?: string;
  cart: SaleItem[];
  payments: SalePayment[];
  discount: number;
  tip?: number;
  cashierId: string;
  cashierName: string;
  createdAt: Date;
}

export interface ModuleRecord {
  id?: number;
  module: ModuleName;
  title: string;
  status: string;
  customerId?: number;
  staffId?: number;
  amount?: number;
  quantity?: number;
  data: any;
  createdAt: Date;
  updatedAt: Date;
}

export type ReportReminder = 'None' | 'Daily' | 'Weekly' | 'Monthly';

export interface ReportFilterSnapshot {
  preset: string;
  start: string;
  end: string;
  staffFilter: string;
  serviceFilter: string;
  productFilter: string;
  customerFilter: string;
  paymentMethodFilter: string;
  statusFilter: string;
  search: string;
}

export interface ReportFavorite {
  reportId: string;
  createdAt: Date;
}

export interface ReportRecent {
  reportId: string;
  viewedAt: Date;
}

export interface SavedReport {
  id?: number;
  reportId: string;
  name: string;
  filters: ReportFilterSnapshot;
  reminder: ReportReminder;
  lastRunAt?: Date;
  createdAt: Date;
}

export type Table<T> = any;

const sqlitePath = path.join(os.homedir(), 'mh-digital-salon-pos.db');
const sqlite = new Database(sqlitePath);
sqlite.pragma('journal_mode = WAL');

const TABLE_CONFIG = {
  services: ['id INTEGER PRIMARY KEY AUTOINCREMENT', 'name TEXT', 'category TEXT', 'price REAL', 'duration INTEGER', 'isActive INTEGER', 'isDemo INTEGER', 'createdAt TEXT', 'updatedAt TEXT'],
  users: ['id INTEGER PRIMARY KEY AUTOINCREMENT', 'username TEXT', 'password TEXT', 'passwordHash TEXT', 'passwordSalt TEXT', 'role TEXT', 'permissions TEXT', 'isActive INTEGER', 'createdAt TEXT', 'updatedAt TEXT'],
  customers: ['id INTEGER PRIMARY KEY AUTOINCREMENT', 'name TEXT', 'phone TEXT', 'email TEXT', 'gender TEXT', 'dob TEXT', 'notes TEXT', 'loyaltyPoints REAL', 'isDemo INTEGER', 'createdAt TEXT', 'updatedAt TEXT'],
  clinicalRecords: ['id INTEGER PRIMARY KEY AUTOINCREMENT', 'customerId INTEGER', 'date TEXT', 'recordType TEXT', 'staffId INTEGER', 'serviceId INTEGER', 'notes TEXT', 'createdAt TEXT', 'updatedAt TEXT'],
  sales: ['id INTEGER PRIMARY KEY AUTOINCREMENT', 'receiptNumber TEXT', 'isDemo INTEGER', 'customerId INTEGER', 'customerName TEXT', 'items TEXT', 'subtotal REAL', 'discount REAL', 'tax REAL', 'total REAL', 'totalPaid REAL', 'balance REAL', 'tipAmount REAL', 'status TEXT', 'transactionStatus TEXT', 'payments TEXT', 'cashierId TEXT', 'cashierName TEXT', 'notes TEXT', 'voidReason TEXT', 'voidedAt TEXT', 'voidedBy TEXT', 'refundAmount REAL', 'refundReason TEXT', 'refundedAt TEXT', 'refundedBy TEXT', 'createdAt TEXT', 'updatedAt TEXT'],
  auditLogs: ['id INTEGER PRIMARY KEY AUTOINCREMENT', 'userId TEXT', 'username TEXT', 'action TEXT', 'details TEXT', 'timestamp TEXT'],
  inventory: ['id INTEGER PRIMARY KEY AUTOINCREMENT', 'type TEXT', 'name TEXT', 'category TEXT', 'sku TEXT', 'barcode TEXT', 'supplierId INTEGER', 'costPrice REAL', 'sellingPrice REAL', 'currentStock REAL', 'minimumStock REAL', 'expiryDate TEXT', 'isActive INTEGER', 'isDemo INTEGER', 'createdAt TEXT', 'updatedAt TEXT'],
  inventoryMovements: ['id INTEGER PRIMARY KEY AUTOINCREMENT', 'productId INTEGER', 'type TEXT', 'quantity REAL', 'beforeQty REAL', 'afterQty REAL', 'userId TEXT', 'reason TEXT', 'date TEXT'],
  settings: ['id INTEGER PRIMARY KEY AUTOINCREMENT', 'salonName TEXT', 'address TEXT', 'phone TEXT', 'email TEXT', 'logoUrl TEXT', 'currency TEXT', 'taxRate REAL', 'taxEnabled INTEGER', 'receiptFooter TEXT', 'expenseLimits TEXT', 'staffPositions TEXT', 'serviceCategories TEXT', 'membershipPlans TEXT', 'expenseCategories TEXT', 'updatedAt TEXT'],
  bookings: ['id INTEGER PRIMARY KEY AUTOINCREMENT', 'isDemo INTEGER', 'customerId INTEGER', 'customerName TEXT', 'type TEXT', 'status TEXT', 'bookingDate TEXT', 'startTime TEXT', 'endTime TEXT', 'services TEXT', 'staffId INTEGER', 'staffName TEXT', 'notes TEXT', 'createdBy TEXT', 'createdAt TEXT', 'updatedAt TEXT', 'completedAt TEXT', 'cancelledAt TEXT', 'cancelledBy TEXT'],
  cashDrawers: ['id INTEGER PRIMARY KEY AUTOINCREMENT', 'status TEXT', 'openedAt TEXT', 'closedAt TEXT', 'openedBy TEXT', 'expectedCash REAL', 'actualCash REAL', 'variance REAL', 'notes TEXT'],
  cashMovements: ['id INTEGER PRIMARY KEY AUTOINCREMENT', 'drawerId INTEGER', 'type TEXT', 'amount REAL', 'reason TEXT', 'date TEXT', 'username TEXT'],
  moduleRecords: ['id INTEGER PRIMARY KEY AUTOINCREMENT', 'module TEXT', 'title TEXT', 'status TEXT', 'customerId INTEGER', 'staffId INTEGER', 'amount REAL', 'quantity REAL', 'data TEXT', 'createdAt TEXT', 'updatedAt TEXT'],
  heldSales: ['id INTEGER PRIMARY KEY AUTOINCREMENT', 'holdId TEXT', 'customerId INTEGER', 'customerName TEXT', 'cart TEXT', 'payments TEXT', 'discount REAL', 'tip REAL', 'cashierId TEXT', 'cashierName TEXT', 'createdAt TEXT'],
  reportFavorites: ['reportId TEXT PRIMARY KEY', 'createdAt TEXT'],
  reportRecents: ['reportId TEXT PRIMARY KEY', 'viewedAt TEXT'],
  savedReports: ['id INTEGER PRIMARY KEY AUTOINCREMENT', 'reportId TEXT', 'name TEXT', 'filters TEXT', 'reminder TEXT', 'lastRunAt TEXT', 'createdAt TEXT']
} as const;

function serializeValue(value: any) {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === 'undefined') return null;
  if (typeof value === 'object') return JSON.stringify(value);
  return value;
}

function deserializeValue(value: any, key?: string) {
  if (value === null || typeof value === 'undefined') return value;
  if (typeof value !== 'string') return value;
  if (key && (key.endsWith('At') || key === 'date' || key === 'bookingDate' || key === 'expiryDate')) {
    return new Date(value);
  }
  if ((value.startsWith('{') && value.endsWith('}')) || (value.startsWith('[') && value.endsWith(']'))) {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }
  return value;
}

function normalizeRow<T>(row: Record<string, any>): T {
  const out: Record<string, any> = {};
  Object.keys(row).forEach((key) => {
    out[key] = deserializeValue(row[key], key);
  });
  return out as T;
}

function ensureTable(tableName: keyof typeof TABLE_CONFIG) {
  const columns = TABLE_CONFIG[tableName].join(', ');
  sqlite.exec(`CREATE TABLE IF NOT EXISTS ${tableName} (${columns});`);
}

Object.keys(TABLE_CONFIG).forEach((tableName) => ensureTable(tableName as keyof typeof TABLE_CONFIG));

class SqlQuery<T> {
  private tableName: string;
  private column?: string;
  private value?: any;
  private equalsIgnoreCaseMode = false;
  private andFilter?: (item: T) => boolean;
  private orderColumn?: string;
  private descending = false;

  constructor(tableName: string, column?: string) {
    this.tableName = tableName;
    this.column = column;
  }

  equals(value: any) {
    this.value = value;
    return this;
  }

  equalsIgnoreCase(value: any) {
    this.equalsIgnoreCaseMode = true;
    this.value = value;
    return this;
  }

  and(predicate: (item: T) => boolean) {
    this.andFilter = predicate;
    return this;
  }

  filter(predicate: (item: T) => boolean) {
    this.andFilter = predicate;
    return this;
  }

  orderBy(column: string) {
    this.orderColumn = column;
    return this;
  }

  reverse() {
    this.descending = true;
    return this;
  }

  async toArray(): Promise<T[]> {
    let rows = await this.execute();
    if (this.andFilter) rows = rows.filter(this.andFilter);
    if (this.orderColumn) {
      rows = [...rows].sort((a: any, b: any) => {
        const av = a[this.orderColumn || ''];
        const bv = b[this.orderColumn || ''];
        const out = (av ?? 0) > (bv ?? 0) ? 1 : (av ?? 0) < (bv ?? 0) ? -1 : 0;
        return this.descending ? -out : out;
      });
    }
    return rows;
  }

  async first(): Promise<T | undefined> {
    const rows = await this.execute();
    const finalRows = this.andFilter ? rows.filter(this.andFilter) : rows;
    return finalRows[0];
  }

  async count(): Promise<number> {
    const rows = await this.execute();
    return this.andFilter ? rows.filter(this.andFilter).length : rows.length;
  }

  private async execute(): Promise<T[]> {
    const allRows = sqlite.prepare(`SELECT * FROM ${this.tableName}`).all() as any[];
    const rows = allRows.map((row) => normalizeRow<T>(row));
    if (!this.column || typeof this.value === 'undefined') {
      return rows;
    }
    if (this.equalsIgnoreCaseMode) {
      return rows.filter((row: any) => String(row[this.column as string] ?? '').toLowerCase() === String(this.value ?? '').toLowerCase());
    }
    return rows.filter((row: any) => row[this.column as string] === this.value);
  }
}

class SqlTable<T> {
  constructor(private tableName: keyof typeof TABLE_CONFIG) {}

  where(column: string) {
    return new SqlQuery<T>(this.tableName, column);
  }

  filter(predicate: (record: T) => boolean) {
    return new SqlQuery<T>(this.tableName).filter(predicate);
  }

  orderBy(column: string) {
    return new SqlQuery<T>(this.tableName).orderBy(column);
  }

  async toArray(): Promise<T[]> {
    const rows = sqlite.prepare(`SELECT * FROM ${this.tableName}`).all() as any[];
    return rows.map((row) => normalizeRow<T>(row));
  }

  async first(): Promise<T | undefined> {
    const rows = await this.toArray();
    return rows[0];
  }

  async count(): Promise<number> {
    const result = sqlite.prepare(`SELECT COUNT(*) as count FROM ${this.tableName}`).get() as { count: number };
    return result.count;
  }

  async add(record: Partial<T>): Promise<number> {
    const data = Object.entries(record ?? {}).reduce((acc, [key, value]) => {
      acc[key] = serializeValue(value);
      return acc;
    }, {} as Record<string, any>);
    const keys = Object.keys(data);
    const placeholders = keys.map(() => '?').join(', ');
    const values = keys.map((key) => data[key]);
    const result = sqlite.prepare(`INSERT INTO ${this.tableName} (${keys.join(', ')}) VALUES (${placeholders})`).run(...values) as { lastInsertRowid: number };
    return Number(result.lastInsertRowid);
  }

  async get(id: number): Promise<T | undefined> {
    const row = sqlite.prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`).get(id) as Record<string, any> | undefined;
    if (!row) return undefined;
    return normalizeRow<T>(row);
  }

  async update(id: number, changes: Partial<T>): Promise<void> {
    const setStatements = Object.keys(changes as any)
      .map((key) => `${key} = ?`)
      .join(', ');
    const values = Object.keys(changes as any).map((key) => serializeValue((changes as any)[key]));
    sqlite.prepare(`UPDATE ${this.tableName} SET ${setStatements} WHERE id = ?`).run(...values, id);
  }

  async delete(id: number): Promise<void> {
    sqlite.prepare(`DELETE FROM ${this.tableName} WHERE id = ?`).run(id);
  }
}

export class SalonDatabase {
  services: Table<Service>;
  users: Table<User>;
  customers: Table<Customer>;
  clinicalRecords: Table<ClinicalRecord>;
  sales: Table<Sale>;
  auditLogs: Table<AuditLog>;
  inventory: Table<InventoryItem>;
  inventoryMovements: Table<InventoryMovement>;
  settings: Table<SystemSettings>;
  bookings: Table<Booking>;
  cashDrawers: Table<any>;
  cashMovements: Table<any>;
  moduleRecords: Table<ModuleRecord>;
  heldSales: Table<HeldSale>;
  reportFavorites: Table<ReportFavorite>;
  reportRecents: Table<ReportRecent>;
  savedReports: Table<SavedReport>;

  constructor() {
    this.services = new SqlTable<Service>('services') as any;
    this.users = new SqlTable<User>('users') as any;
    this.customers = new SqlTable<Customer>('customers') as any;
    this.clinicalRecords = new SqlTable<ClinicalRecord>('clinicalRecords') as any;
    this.sales = new SqlTable<Sale>('sales') as any;
    this.auditLogs = new SqlTable<AuditLog>('auditLogs') as any;
    this.inventory = new SqlTable<InventoryItem>('inventory') as any;
    this.inventoryMovements = new SqlTable<InventoryMovement>('inventoryMovements') as any;
    this.settings = new SqlTable<SystemSettings>('settings') as any;
    this.bookings = new SqlTable<Booking>('bookings') as any;
    this.cashDrawers = new SqlTable<any>('cashDrawers') as any;
    this.cashMovements = new SqlTable<any>('cashMovements') as any;
    this.moduleRecords = new SqlTable<ModuleRecord>('moduleRecords') as any;
    this.heldSales = new SqlTable<HeldSale>('heldSales') as any;
    this.reportFavorites = new SqlTable<ReportFavorite>('reportFavorites') as any;
    this.reportRecents = new SqlTable<ReportRecent>('reportRecents') as any;
    this.savedReports = new SqlTable<SavedReport>('savedReports') as any;
  }

  async transaction<R>(mode: string, ...args: any[]): Promise<R> {
    const callback = typeof args[args.length - 1] === 'function' ? args.pop() : undefined;
    if (!callback) return Promise.resolve(undefined as unknown as R);
    sqlite.exec('BEGIN');
    try {
      const result = await callback();
      sqlite.exec('COMMIT');
      return result as R;
    } catch (error) {
      sqlite.exec('ROLLBACK');
      throw error;
    }
  }
}

export const db = new SalonDatabase();

export default db;
