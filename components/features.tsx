"use client";

import { useState } from "react";
import { Input } from "@nextui-org/input";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import BlurredShapeGray from "@/public/images/blurred-shape-gray.svg";
import BlurredShape from "@/public/images/blurred-shape.svg";

export default function Features() {
  const [transactionDetails, setTransactionDetails] = useState("");
  const [response, setResponse] = useState("");
  const [percentage, setPercentage] = useState("");
  const [loading, setLoading] = useState(false);
  const [viewOutput, setViewOutput] = useState(false); // Track view state

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");
    setPercentage("");

    try {
      const res = await fetch("https://genaibackend-jtt2.onrender.com/fraud-detect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: transactionDetails }),
      });

      const data = await res.json();
      setResponse(data.response);
      setPercentage(data.percentage);
      setViewOutput(true); // Switch to output view
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setViewOutput(false); // Switch back to input form view
  };

  const getCircleColor = () => {
    const percentageValue = parseInt(percentage, 10);
    if (percentageValue >= 80) return "#F44336"; // Red for high risk
    if (percentageValue >= 50) return "#FF9800"; // Orange for moderate risk
    return "#4CAF50"; // Green for low risk
  };

  const getRiskLabel = () => {
    const percentageValue = parseInt(percentage, 10);
    if (percentageValue >= 80) return "High Risk";
    if (percentageValue >= 50) return "Moderate Risk";
    return "Low Risk";
  };

  return (
    <section className="relative">
      {/* Background Shapes */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 -mt-20 -translate-x-1/2"
        aria-hidden="true"
      >
        <Image
          className="max-w-none"
          src={BlurredShapeGray}
          width={760}
          height={668}
          alt="Blurred shape"
        />
      </div>
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -mb-80 -translate-x-[120%] opacity-50"
        aria-hidden="true"
      >
        <Image
          className="max-w-none"
          src={BlurredShape}
          width={760}
          height={668}
          alt="Blurred shape"
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-t py-12 [border-image:linear-gradient(to_right,transparent,theme(colors.slate.400/.25),transparent)1] md:py-20">
          {/* Section Header */}
          <div className="mx-auto max-w-3xl pb-4 text-center md:pb-12">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-gradient-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-gradient-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                Check Fraud Risk
              </span>
            </div>
            <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Instant Phishing Scan
            </h2>
            <p className="text-lg text-indigo-200/65">
              Paste your financial transaction details to check for fraud risk.
            </p>
          </div>

          {/* Conditional Rendering */}
          {viewOutput ? (
            <>
              {/* Output View */}
              <div className="text-center">
              <h4 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
            Fraud Detection Result:
            </h4>
            <p className="text-lg text-indigo-200/65 m-5">
           Input: {transactionDetails}
            </p>
                <ReactMarkdown className="prose prose-indigo text-gray-300 text-2xl">
                  {response}
                </ReactMarkdown>

                {percentage && (
                  <>
                    <h3 className="text-xl font-semibold text-indigo-500 mt-4">
                      Fraud Risk Percentage:
                    </h3>
                    <div
                      className="text-3xl font-bold mt-2"
                      style={{ color: getCircleColor() }}
                    >
                      {percentage}%
                    </div>
                    <p
                      className="text-lg mt-1"
                      style={{ color: getCircleColor() }}
                    >
                      {getRiskLabel()}
                    </p>
                  </>
                )}
                {/* Back Button */}
                <button
                  className="mt-6 w-fit mx-auto bg-gray-600 text-white px-6 py-2 rounded-full shadow-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-500"
                  onClick={handleBack}
                >
                  Back
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Input Form View */}
              <form className="w-full" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                  <input
                    aria-label="Transaction Details"
                    type="text"
                    placeholder="Enter financial transaction details..."
                    value={transactionDetails}
                    onChange={(e) => setTransactionDetails(e.target.value)}
                    required
                    className="rounded-md bg-white/5 text-indigo-100 border-radius: 2px border-2"
                  />
                  <button
                    type="submit"
                    className="w-fit mx-auto bg-indigo-600 text-white px-6 py-2 rounded-full shadow-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
                  >
                    Check
                  </button>
                </div>
              </form>
            </>
          )}

          {/* Loading Animation */}
          {loading && (
            <div className="mt-4 flex justify-center items-center text-indigo-500">
              <div className="loader mr-2 w-6 h-6 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              <p>Analyzing...</p>
            </div>
          )}
        </div>
      </div>

      {/* Loader CSS */}
      <style jsx>{`
        .loader {
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}
