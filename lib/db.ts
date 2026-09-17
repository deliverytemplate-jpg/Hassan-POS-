import Dexie, { Table } from 'dexie';
import { getDbName } from '@/lib/app-mode';

export type UserRole = 'Admin' | 'Supervisor' | 'Cashier';
export type Permission = string;
export type PaymentMethod = 'Cash' | 'M-Pesa' | 'Card' | 'Bank Transfer' | 'Other' | 'Voucher';
export type PaymentStatus = 'Unpaid' | 'Pending' | 'Partially Paid' | 'Paid' | 'Cancelled';
export type TransactionStatus = 'Completed' | 'Voided' | 'Refunded' | 'Reversed';
export type ModuleName = 'booking' | 'customer-record' | 'staff' | 'commission' | 'expense' | 'supplier' | 'purchase-order' | 'package' | 'membership' | 'voucher' | 'loyalty' | 'promotion' | 'attendance' | 'leave' | 'notification' | 'cash_drawer';

export interface Service { [key: string]: any; id?: number; name: string; category: string; price: number; duration?: number; isActive: boolean; isDemo?: boolean; createdAt: Date; updatedAt: Date; }
export interface User { [key: string]: any; id?: number; username: string; password?: string; passwordHash?: string; passwordSalt?: string; role: UserRole; permissions?: Permission[]; isActive: boolean; createdAt: Date; updatedAt: Date; }
export interface Customer { [key: string]: any; id?: number; name: string; phone: string; email?: string; gender: string; dob?: string; notes: string; loyaltyPoints: number; isDemo?: boolean; createdAt: Date; updatedAt: Date; }
export interface ClinicalRecord { [key: string]: any; id?: number; customerId: number; date: Date; recordType: string; staffId: number; serviceId?: number; notes: string; createdAt: Date; updatedAt: Date; }
export interface SaleItem { [key: string]: any; id: string; type: 'Service' | 'Product'; serviceId?: number; productId?: number; name: string; price: number; quantity: number; staffId?: number; staffName?: string; discount: number; total: number; }
export interface SalePayment { [key: string]: any; method: PaymentMethod; amount: number; reference?: string; cardLast4?: string; approvalCode?: string; date: Date; }
export interface Sale { [key: string]: any; id?: number; receiptNumber: string; isDemo?: boolean; customerId: number; customerName: string; items: SaleItem[]; subtotal: number; discount: number; tax: number; total: number; totalPaid: number; balance: number; tipAmount?: number; status: PaymentStatus; transactionStatus: TransactionStatus; payments: SalePayment[]; cashierId: string; cashierName: string; notes?: string; createdAt: Date; updatedAt: Date; }
export interface AuditLog { [key: string]: any; id?: number; userId: string; username: string; action: string; details: string; timestamp: Date; }
export interface InventoryItem { [key: string]: any; id?: number; type: 'Retail' | 'Operational'; name: string; category: string; sku?: string; barcode?: string; supplierId?: number; costPrice: number; sellingPrice: number; currentStock: number; minimumStock: number; expiryDate?: Date; isActive: boolean; isDemo?: boolean; createdAt: Date; updatedAt: Date; }
export interface InventoryMovement { [key: string]: any; id?: number; productId: number; type: string; quantity: number; beforeQty: number; afterQty: number; userId: string; reason: string; date: Date; }
export interface SystemSettings { [key: string]: any; id?: number; salonName: string; address: string; phone: string; email: string; logoUrl?: string; currency: string; taxRate: number; taxEnabled: boolean; receiptFooter: string; expenseLimits: Record<string, number>; staffPositions?: string[]; serviceCategories?: string[]; membershipPlans?: string[]; expenseCategories?: string[]; updatedAt: Date; }
export interface Booking { [key: string]: any; id?: number; isDemo?: boolean; customerId: number; customerName: string; type: 'Walk-in' | 'Appointment'; status: string; bookingDate: Date; startTime: string; endTime: string; services: any[]; staffId?: number; staffName?: string; notes?: string; createdBy?: string; createdAt: Date; updatedAt: Date; completedAt?: Date; cancelledAt?: Date; cancelledBy?: string; }
export interface HeldSale { [key: string]: any; id?: number; holdId: string; customerId?: number; customerName?: string; cart: SaleItem[]; payments: SalePayment[]; discount: number; tip?: number; cashierId: string; cashierName: string; createdAt: Date; }
export interface ModuleRecord { [key: string]: any; id?: number; module: ModuleName; title: string; status: string; customerId?: number; staffId?: number; amount?: number; quantity?: number; data: any; createdAt: Date; updatedAt: Date; }
export type ReportReminder = 'None' | 'Daily' | 'Weekly' | 'Monthly';
export interface ReportFilterSnapshot { [key: string]: any; preset: string; start: string; end: string; staffFilter: string; serviceFilter: string; productFilter: string; customerFilter: string; paymentMethodFilter: string; statusFilter: string; search: string; }
export interface ReportFavorite { [key: string]: any; reportId: string; createdAt: Date; }
export interface ReportRecent { [key: string]: any; reportId: string; viewedAt: Date; }
export interface SavedReport { [key: string]: any; id?: number; reportId: string; name: string; filters: ReportFilterSnapshot; reminder: ReportReminder; lastRunAt?: Date; createdAt: Date; }

export class SalonDatabase extends Dexie {
  services!: Table<Service>; users!: Table<User>; customers!: Table<Customer>; clinicalRecords!: Table<ClinicalRecord>; sales!: Table<Sale>; auditLogs!: Table<AuditLog>; inventory!: Table<InventoryItem>; inventoryMovements!: Table<InventoryMovement>; settings!: Table<SystemSettings>; bookings!: Table<Booking>; cashDrawers!: Table<any>; cashMovements!: Table<any>; moduleRecords!: Table<ModuleRecord>; heldSales!: Table<HeldSale>; reportFavorites!: Table<ReportFavorite>; reportRecents!: Table<ReportRecent>; savedReports!: Table<SavedReport>;

  constructor() {
    super(getDbName());
    this.version(11).stores({
      services: '++id, name, category, isActive, createdAt, updatedAt',
      users: '++id, username, role, isActive, createdAt, updatedAt',
      customers: '++id, name, phone, email, createdAt, updatedAt',
      clinicalRecords: '++id, customerId, staffId, date, createdAt, updatedAt',
      sales: '++id, receiptNumber, customerId, status, transactionStatus, createdAt, updatedAt',
      auditLogs: '++id, userId, action, timestamp',
      inventory: '++id, name, type, category, sku, isActive, createdAt, updatedAt',
      inventoryMovements: '++id, productId, type, date',
      settings: '++id',
      bookings: '++id, customerId, status, bookingDate, staffId, createdAt, updatedAt',
      cashDrawers: '++id, status, openedAt',
      cashMovements: '++id, drawerId, type',
      moduleRecords: '++id, module, status, customerId, staffId, createdAt, updatedAt',
      heldSales: '++id, holdId, cashierId, createdAt',
      reportFavorites: 'reportId, createdAt',
      reportRecents: 'reportId, viewedAt',
      savedReports: '++id, reportId, createdAt'
    });
  }
}

export const db = new SalonDatabase();
export default db;
