let pendingPhone: string | null = null;

export function setPendingPhone(phone: string): void {
  pendingPhone = phone;
}

export function getPendingPhone(): string | null {
  return pendingPhone;
}

export function clearPendingPhone(): void {
  pendingPhone = null;
}
