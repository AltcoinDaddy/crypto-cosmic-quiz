"use client";


 import React, { useState, useEffect } from "react";
 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import { AlertCircle, Rocket, Star } from "lucide-react";
 import axios from "axios";

 interface Question {
   question: string;
   options: string[];
   correctAnswer: number;
 }

 const CHAINBASE_API_KEY = process.env.NEXT_PUBLIC_CHAINBASE_KEY;
 const CHAINBASE_API_URL = "https://api.chainbase.online/v1";

 const CryptoTriviaGame: React.FC = () => {
   const [questions, setQuestions] = useState<Question[]>([]);
   const [currentQuestion, setCurrentQuestion] = useState(0);
   const [score, setScore] = useState(0);
   const [showResult, setShowResult] = useState(false);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
   const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

   useEffect(() => {
     fetchQuestions();
   }, []);

   const fetchBlockchainData = async () => {
     try {
       const [ethPrice, btcPrice] = await Promise.all([
         axios.get(`${CHAINBASE_API_URL}/token/price`, {
           params: {
             chain_id: 1,
             contract_address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
           },
           headers: { "x-api-key": CHAINBASE_API_KEY },
         }),
         axios.get(`${CHAINBASE_API_URL}/token/price`, {
           params: {
             chain_id: 1,
             contract_address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
           },
           headers: { "x-api-key": CHAINBASE_API_KEY },
         }),
       ]);

       return {
         ethPrice: ethPrice.data.data.price,
         btcPrice: btcPrice.data.data.price,
       };
     } catch (error) {
       console.error("Error fetching data from Chainbase:", error);
       throw error;
     }
   };

   const generateQuestions = (data: any): Question[] => {
     return [
       {
         question: "What is the current price of Ethereum (ETH)?",
         options: [
           `$${(data.ethPrice * 0.9).toFixed(2)}`,
           `$${data.ethPrice.toFixed(2)}`,
           `$${(data.ethPrice * 1.1).toFixed(2)}`,
           `$${(data.ethPrice * 1.2).toFixed(2)}`,
         ],
         correctAnswer: 1,
       },
       {
         question: "What is the current price of Bitcoin (BTC)?",
         options: [
           `$${(data.btcPrice * 0.9).toFixed(2)}`,
           `$${(data.btcPrice * 1.1).toFixed(2)}`,
           `$${data.btcPrice.toFixed(2)}`,
           `$${(data.btcPrice * 1.2).toFixed(2)}`,
         ],
         correctAnswer: 2,
       },
     ];
   };

   const fetchQuestions = async () => {
     setLoading(true);
     setError(null);

     try {
       const data = await fetchBlockchainData();
       const newQuestions = generateQuestions(data);
       setQuestions(newQuestions);
     } catch (err) {
       setError(null);
     } finally {
       setLoading(false);
     }
   };

   const handleAnswer = (index: number) => {
     setSelectedAnswer(index);
     setIsCorrect(index === questions[currentQuestion].correctAnswer);

     setTimeout(() => {
       if (index === questions[currentQuestion].correctAnswer) {
         setScore(score + 1);
       }

       if (currentQuestion + 1 < questions.length) {
         setCurrentQuestion(currentQuestion + 1);
       } else {
         setShowResult(true);
       }

       setSelectedAnswer(null);
       setIsCorrect(null);
     }, 1000);
   };

   const restartGame = () => {
     setCurrentQuestion(0);
     setScore(0);
     setShowResult(false);
     setSelectedAnswer(null);
     setIsCorrect(null);
     fetchQuestions();
   };

   if (loading) {
     return (
       <div className="flex justify-center items-center h-screen bg-gradient-to-b from-purple-900 to-indigo-900">
         <Rocket className="w-16 h-16 text-white animate-bounce" />
       </div>
     );
   }

   if (error) {
     return (
       <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-purple-900 to-indigo-900">
         <AlertCircle className="w-16 h-16 text-red-500 mb-4 animate-pulse" />
         <p className="text-red-500 text-xl mb-4">{error}</p>
         <Button
           onClick={fetchQuestions}
           className="mt-4 bg-indigo-600 hover:bg-indigo-700"
         >
           Try Again
         </Button>
       </div>
     );
   }

   return (
     <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900 p-4">
       <Card className="w-full max-w-md bg-opacity-80 backdrop-filter backdrop-blur-lg">
         <CardHeader className="text-center">
           <CardTitle className="text-3xl font-bold flex items-center justify-center">
             <Rocket className="w-8 h-8 mr-2 inline-block" />
             Cosmic Crypto Quiz
           </CardTitle>
         </CardHeader>
         <CardContent>
           {!showResult ? (
             <>
               <div className="mb-6 flex justify-between items-center">
                 <span className="text-lg font-semibold">
                   Question {currentQuestion + 1}/{questions.length}
                 </span>
                 <span className="text-lg font-semibold">
                   Score: {score}
                 </span>
               </div>
               <p className="mb-6 text-xl">
                 {questions[currentQuestion].question}
               </p>
               <div className="space-y-4">
                 {questions[currentQuestion].options.map((option, index) => (
                   <Button
                     key={index}
                     onClick={() => handleAnswer(index)}
                     className={`w-full text-left justify-start text-lg p-4 transition-all duration-200 ${
                       selectedAnswer === index
                         ? isCorrect
                           ? "bg-green-500 hover:bg-green-600"
                           : "bg-red-500 hover:bg-red-600"
                         : "bg-indigo-600 hover:bg-indigo-700"
                     }`}
                     disabled={selectedAnswer !== null}
                   >
                     {option}
                   </Button>
                 ))}
               </div>
             </>
           ) : (
             <div className="text-center">
               <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
               <p className="text-xl mb-6">
                 Your cosmic score: {score} out of {questions.length}
               </p>
               <div className="flex justify-center space-x-2 mb-6">
                 {[...Array(score)].map((_, i) => (
                   <Star
                     key={i}
                     className="w-8 h-8 text-yellow-400 animate-pulse"
                   />
                 ))}
               </div>
               <Button
                 onClick={restartGame}
                 className="w-full bg-indigo-600 hover:bg-indigo-700 text-lg"
               >
                 <Rocket className="w-5 h-5 mr-2" /> Launch Another Quiz
               </Button>
             </div>
           )}
         </CardContent>
       </Card>
     </div>
   );
 };

 export default CryptoTriviaGame;
