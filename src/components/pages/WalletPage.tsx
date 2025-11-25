import { useState } from 'react';
import { ArrowUpCircle, ArrowDownCircle, Plus, Download } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { mockTransactions } from '../../lib/mockData';
import { toast } from 'sonner@2.0.3';

interface WalletPageProps {
  onNavigate: (page: string) => void;
}

export function WalletPage({ onNavigate }: WalletPageProps) {
  const [isAddFundsOpen, setIsAddFundsOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [amount, setAmount] = useState('');

  const balance = 150.0;

  const handleAddFunds = () => {
    toast.success('Funds added successfully!');
    setIsAddFundsOpen(false);
    setAmount('');
  };

  const handleWithdraw = () => {
    toast.success('Withdrawal request submitted!');
    setIsWithdrawOpen(false);
    setAmount('');
  };

  return (
    <div className="min-h-screen bg-secondary">
      <div className="mx-auto max-w-[1366px] px-20 py-8">
        <h1 className="mb-8 font-semibold">Wallet</h1>

        {/* Balance Card */}
        <div className="mb-8 overflow-hidden rounded-lg border border-border bg-gradient-to-br from-primary to-primary/80 p-8 text-white shadow-lg">
          <div className="mb-2 text-sm opacity-90">Current Balance</div>
          <div className="mb-6 flex items-baseline gap-2">
            <span className="font-semibold">${balance.toFixed(2)}</span>
          </div>

          <div className="flex gap-3">
            <Dialog open={isAddFundsOpen} onOpenChange={setIsAddFundsOpen}>
              <DialogTrigger asChild>
                <Button className="bg-white text-primary hover:bg-white/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Funds
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Funds to Wallet</DialogTitle>
                  <DialogDescription>
                    Add money to your TutorMate wallet to pay for tutoring sessions
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="add-amount">Amount ($)</Label>
                    <Input
                      id="add-amount"
                      type="number"
                      placeholder="50.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      min="0"
                      step="0.01"
                    />
                  </div>

                  <div className="flex gap-2">
                    {[25, 50, 100, 200].map((value) => (
                      <button
                        key={value}
                        onClick={() => setAmount(value.toString())}
                        className="flex-1 rounded-lg border border-border bg-secondary px-3 py-2 text-sm hover:border-primary"
                      >
                        ${value}
                      </button>
                    ))}
                  </div>

                  <div className="rounded-lg bg-secondary/50 p-4">
                    <div className="mb-2 text-sm font-medium">Payment Method</div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-16 items-center justify-center rounded bg-white text-xs font-semibold">
                        CARD
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">•••• •••• •••• 4242</div>
                        <div className="text-xs text-muted-foreground">Expires 12/25</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline" onClick={() => setIsAddFundsOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddFunds}
                      className="bg-primary hover:bg-primary/90"
                      disabled={!amount || parseFloat(amount) <= 0}
                    >
                      Add ${amount || '0.00'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Download className="mr-2 h-4 w-4" />
                  Withdraw
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Withdraw Funds</DialogTitle>
                  <DialogDescription>
                    Withdraw funds from your TutorMate wallet to your bank account
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="rounded-lg bg-secondary/50 p-3 text-sm">
                    Available balance: <span className="font-medium">${balance.toFixed(2)}</span>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="withdraw-amount">Amount ($)</Label>
                    <Input
                      id="withdraw-amount"
                      type="number"
                      placeholder="50.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      min="0"
                      max={balance}
                      step="0.01"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bank-account">Bank Account</Label>
                    <div className="flex items-center gap-3 rounded-lg border border-border bg-secondary/50 p-3">
                      <div className="flex-1">
                        <div className="text-sm font-medium">•••• •••• •••• 5678</div>
                        <div className="text-xs text-muted-foreground">Checking Account</div>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Withdrawals typically take 3-5 business days to process.
                  </p>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline" onClick={() => setIsWithdrawOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handleWithdraw}
                      className="bg-primary hover:bg-primary/90"
                      disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > balance}
                    >
                      Withdraw ${amount || '0.00'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Transaction History */}
        <div className="rounded-lg border border-border bg-white">
          <div className="border-b border-border p-6">
            <h2 className="font-semibold">Transaction History</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-muted-foreground">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-border hover:bg-secondary/20">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {transaction.type === 'credit' ? (
                          <ArrowDownCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <ArrowUpCircle className="h-5 w-5 text-red-600" />
                        )}
                        <span className="font-medium capitalize">{transaction.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">{transaction.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          transaction.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span
                        className={`font-medium ${
                          transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}