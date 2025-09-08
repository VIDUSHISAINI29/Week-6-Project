import React, { useState, useContext } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, ArrowRight, Linkedin } from 'lucide-react'
import Button from '../components/ui/Button'
import Input  from '../components/ui/Input'
import Label  from '../components/ui/Label'
import {Card}  from '../components/ui/Card'
import { toast } from 'sonner'
import Logo from '../components/common/Logo'
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const {login, user} = useContext(AuthContext);
    const {logout} = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    // name: ''
  })
 
 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        setIsLoading(true);
      const resp = await login(formData.email, formData.password);
      console.log('user= ',user)
        setIsLoading(false);
      navigate("/");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  const handleInputChange = async (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />
        <div className="absolute top-0 left-0 rounded-full w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-400/30 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 delay-1000 rounded-full w-96 h-96 bg-gradient-to-br from-indigo-400/30 to-pink-400/30 blur-3xl animate-pulse" />
        <div className="absolute w-64 h-64 delay-500 transform -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 blur-2xl animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
        className="w-full max-w-md"
      >
        <Card className="p-8 space-y-6 glass-elevated">
          {/* Logo and Header */}
          <div className="space-y-4 text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <Logo className="mx-auto mb-4" />
            </motion.div>
            <div>
              <h1 className="mt-10 gradient-text">Welcome Back</h1>
              <p className="text-muted-foreground">Login to your Global Connect account</p>
            </div>
          </div>

          {/* Social Login */}
          {/* <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => handleSocialLogin('Google')}
              className="border-0 glass-card hover-lift"
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSocialLogin('LinkedIn')}
              className="border-0 glass-card hover-lift"
            >
              <Linkedin className="w-4 h-4 mr-2" />
              LinkedIn
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 bg-card text-muted-foreground">Or continue with email</span>
            </div>
          </div> */}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10 border-0 glass-card"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 pr-10 border-0 glass-card"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm">
                <input type="checkbox" className="rounded border-border" />
                <span>Remember me</span>
              </label>
              <Button variant="link" className="h-auto p-0 text-sm">
                Forgot password?
              </Button>
            </div> */}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full mt-3 mb-10 gradient-primary hover:gradient-primary/90 hover-lift group"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 mr-2 border-2 rounded-full border-white/30 border-t-white animate-spin" />
                  Logging in...
                </div>
              ) : (
                <div className="flex items-center">
                  Login
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </div>
              )}
            </Button>
          </form>


          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
             <Link to="/signup">
              <Button
                variant="link"
                className="h-auto p-0 gradient-text hover:no-underline"
              >
                Sign up now
              </Button>
             </Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

export default Login;