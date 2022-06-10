export interface Loan {
    id: number,
    deadlineDate: Date,
    amount: number,
    isApproved: boolean,
    isPaid: boolean,
    userId: number
}
