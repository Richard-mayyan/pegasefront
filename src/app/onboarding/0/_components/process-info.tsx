"use client";

import React from "react";
import { CheckCircle, CreditCard, Users, Zap } from "lucide-react";

export default function ProcessInfo() {
  return (
    <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-teal-800 mb-4 text-center">
        Comment ça marche ?
      </h3>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="text-center">
          <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6 text-teal-600" />
          </div>
          <h4 className="font-medium text-teal-800 mb-2">
            1. Choisissez votre plan
          </h4>
          <p className="text-sm text-teal-700">
            Sélectionnez le plan qui correspond à vos besoins
          </p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <CreditCard className="w-6 h-6 text-teal-600" />
          </div>
          <h4 className="font-medium text-teal-800 mb-2">
            2. Enregistrez votre carte
          </h4>
          <p className="text-sm text-teal-700">
            Vos informations de paiement sont sécurisées par Stripe
          </p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Zap className="w-6 h-6 text-teal-600" />
          </div>
          <h4 className="font-medium text-teal-800 mb-2">
            3. Commencez immédiatement
          </h4>
          <p className="text-sm text-teal-700">
            Accédez à toutes les fonctionnalités de votre plan
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-white rounded-lg border border-teal-200">
        <div className="flex items-center gap-2 text-teal-700">
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium">Sécurisé et sans engagement</span>
        </div>
        <p className="text-sm text-teal-600 mt-2">
          Votre carte ne sera débitée qu'après la période d'essai. Vous pouvez
          annuler à tout moment.
        </p>
      </div>
    </div>
  );
}
