import MathFormula from "@/components/math-formula";

export const math = {
  render: MathFormula,
  attributes: {
    formula: { type: String, required: true }
  }
} 