"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Brain, Sparkles, Copy, Download, Check } from "lucide-react"

const sampleCode = `import torch
import torch.nn as nn
import math

class MultiHeadAttention(nn.Module):
    """
    Multi-Head Attention mechanism from "Attention Is All You Need"
    
    Args:
        d_model: Dimension of the model
        num_heads: Number of attention heads
        dropout: Dropout probability
    """
    def __init__(self, d_model: int = 512, num_heads: int = 8, dropout: float = 0.1):
        super().__init__()
        assert d_model % num_heads == 0, "d_model must be divisible by num_heads"
        
        self.d_model = d_model
        self.num_heads = num_heads
        self.d_k = d_model // num_heads
        
        # Linear projections for Q, K, V
        self.W_q = nn.Linear(d_model, d_model)
        self.W_k = nn.Linear(d_model, d_model)
        self.W_v = nn.Linear(d_model, d_model)
        self.W_o = nn.Linear(d_model, d_model)
        
        self.dropout = nn.Dropout(dropout)
        
    def scaled_dot_product_attention(self, Q, K, V, mask=None):
        """
        Compute scaled dot-product attention
        
        Attention(Q, K, V) = softmax(QK^T / sqrt(d_k)) * V
        """
        # QK^T / sqrt(d_k)
        scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(self.d_k)
        
        if mask is not None:
            scores = scores.masked_fill(mask == 0, float('-inf'))
        
        # Softmax and dropout
        attention_weights = torch.softmax(scores, dim=-1)
        attention_weights = self.dropout(attention_weights)
        
        # Multiply by V
        return torch.matmul(attention_weights, V), attention_weights
    
    def forward(self, Q, K, V, mask=None):
        batch_size = Q.size(0)
        
        # Linear projections and reshape for multi-head
        Q = self.W_q(Q).view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        K = self.W_k(K).view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        V = self.W_v(V).view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        
        # Apply attention
        x, attention_weights = self.scaled_dot_product_attention(Q, K, V, mask)
        
        # Concatenate heads and apply final projection
        x = x.transpose(1, 2).contiguous().view(batch_size, -1, self.d_model)
        return self.W_o(x)


# Example usage
if __name__ == "__main__":
    # Create multi-head attention layer
    mha = MultiHeadAttention(d_model=512, num_heads=8)
    
    # Random input (batch_size=2, seq_len=10, d_model=512)
    x = torch.randn(2, 10, 512)
    
    # Self-attention (Q=K=V)
    output = mha(x, x, x)
    print(f"Input shape: {x.shape}")
    print(f"Output shape: {output.shape}")
`

export function PaperToCode() {
  const [text, setText] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [code, setCode] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setCode(sampleCode)
      setIsGenerating(false)
    }, 2500)
  }

  const loadSample = () => {
    setText(`The Transformer model architecture relies entirely on self-attention mechanisms, 
dispensing with recurrence and convolutions. Multi-head attention allows the model 
to jointly attend to information from different representation subspaces. The 
attention function maps a query and a set of key-value pairs to an output, computed 
as a weighted sum of the values, where the weight is computed by a compatibility 
function of the query with the corresponding key.

Attention(Q, K, V) = softmax(QK^T / sqrt(d_k)) * V

The multi-head attention mechanism runs through the scaled dot-product attention 
multiple times in parallel, with different learned linear projections.`)
  }

  const handleCopy = () => {
    if (code) {
      navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (code) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Generated Code</h2>
            <p className="text-muted-foreground">PyTorch implementation ready to use</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCopy}>
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
            <Button variant="outline" onClick={() => setCode(null)}>
              New Paper
            </Button>
          </div>
        </div>

        <Card className="border-border/50 bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Python</Badge>
              <Badge variant="secondary">PyTorch</Badge>
            </div>
            <Button variant="ghost" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </CardHeader>
          <CardContent>
            <div className="max-h-[500px] overflow-auto rounded-lg bg-background p-4">
              <pre className="font-mono text-sm text-foreground">
                <code>{code}</code>
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="py-4">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">Code Explanation</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  This implementation includes the Multi-Head Attention class with scaled dot-product attention,
                  linear projections for Q/K/V, and proper head splitting/concatenation. The example shows
                  self-attention where Q=K=V.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <Brain className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Paper-to-Code Generator</h2>
        <p className="mt-2 text-muted-foreground">
          Transform research methodology into working code
        </p>
      </div>

      <div className="mx-auto max-w-2xl space-y-4">
        <Card className="border-border/50 bg-card/50">
          <CardContent className="pt-6">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste paper methodology, algorithm description, or equations..."
              className="min-h-[200px] bg-background font-mono text-sm"
            />
            <div className="mt-4 flex justify-between">
              <Button variant="outline" onClick={loadSample}>
                Load Sample
              </Button>
              <Button onClick={handleGenerate} disabled={!text.trim() || isGenerating}>
                {isGenerating ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Generate Code
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="secondary">Supports: PyTorch</Badge>
          <Badge variant="secondary">TensorFlow</Badge>
          <Badge variant="secondary">JAX</Badge>
          <Badge variant="secondary">NumPy</Badge>
        </div>
      </div>
    </div>
  )
}
