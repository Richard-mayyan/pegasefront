import { ACCESS_TOKEN_KEY } from "@/lib/constants";
import { apiClient } from "@/logic/infra/repos/nodeapi/axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Types pour l'API
interface PaymentIntentResponse {
  clientSecret: string;
  setupIntentId: string;
  publishableKey: string;
  status: string;
}

export const usePaymentIntent = (onSuccess?: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentIntent, setPaymentIntent] =
    useState<PaymentIntentResponse | null>(null);

  const fetchPaymentIntent = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.post<PaymentIntentResponse>(
        "/user/intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`,
          },
          body: JSON.stringify({
            amount: 5000, // 50€ en centimes
            currency: "eur",
          }),
        }
      );
      const data = response.data;
      onSuccess && onSuccess();
      setPaymentIntent(data);
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur lors de la récupération du payment intent");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // fetchPaymentIntent();
  }, []);

  return {
    paymentIntent,
    isLoadingPaymentIntent: isLoading,
    fetchPaymentIntent,
  };
};
