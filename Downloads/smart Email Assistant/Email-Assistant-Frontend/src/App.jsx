import { useState } from 'react'
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Paper, Typography, CircularProgress, Box, Container } from '@mui/material'
import './App.css'

function App() {
  const [text, setText] = useState('')
  const [type, setType] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    if (!text.trim()) {
      setError('Please enter the original email text')
      return
    }

    setLoading(true)
    setError('')
    setResponse('')

    try {
      const res = await fetch('http://localhost:8080/api/email/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, type }),
      })

      if (!res.ok) {
        throw new Error('Failed to generate email')
      }

      const data = await res.text()
      setResponse(data)
    } catch (err) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setText('')
    setType('')
    setResponse('')
    setError('')
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          Smart Email Assistant
        </Typography>

        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Original Email
          </Typography>
          
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            placeholder="Paste the original email here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Email Tone</InputLabel>
            <Select
              value={type}
              label="Email Tone"
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value="">Default</MenuItem>
              <MenuItem value="formal">Formal</MenuItem>
              <MenuItem value="casual">Casual</MenuItem>
              <MenuItem value="friendly">Friendly</MenuItem>
              <MenuItem value="professional">Professional</MenuItem>
              <MenuItem value="apologetic">Apologetic</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Generate Reply'}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={handleClear}
              disabled={loading}
            >
              Clear
            </Button>
          </Box>
        </Paper>

        {error && (
          <Paper elevation={3} sx={{ p: 3, mb: 3, bgcolor: '#ffebee' }}>
            <Typography color="error">
              Error: {error}
            </Typography>
          </Paper>
        )}

        {response && (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Generated Reply
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={10}
              variant="outlined"
              value={response}
              InputProps={{
                readOnly: true,
              }}
            />
          </Paper>
        )}
      </Box>
    </Container>
  )
}

export default App
