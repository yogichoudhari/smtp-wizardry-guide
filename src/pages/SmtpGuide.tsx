
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Info, Mail, Shield, Settings, AlertTriangle, Copy, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const SmtpGuide = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="container mx-auto py-10 px-4 md:px-6 max-w-5xl">
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">SMTP Configuration Guide</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn how to set up your email provider's SMTP settings to send emails through our platform
          </p>
        </div>

        <Alert className="bg-amber-50 border-amber-200 my-6">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          <AlertTitle className="text-amber-800">Important</AlertTitle>
          <AlertDescription className="text-amber-700">
            For security reasons, we recommend using app passwords instead of your main account password when setting up SMTP.
          </AlertDescription>
        </Alert>

        <div className="grid gap-8 md:grid-cols-3 py-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-600" /> What is SMTP?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>SMTP (Simple Mail Transfer Protocol) is the standard protocol for sending emails across the Internet.</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-purple-600" /> Why configure SMTP?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Configuring SMTP allows you to send emails from our platform using your own email address and provider.</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" /> Secure sending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>All connections to SMTP servers are encrypted. Your credentials are securely stored and never shared.</p>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />

        <Tabs defaultValue="gmail" className="w-full">
          <TabsList className="w-full justify-start mb-6 overflow-x-auto flex-nowrap">
            <TabsTrigger value="gmail">Gmail</TabsTrigger>
            <TabsTrigger value="outlook">Outlook</TabsTrigger>
            <TabsTrigger value="yahoo">Yahoo Mail</TabsTrigger>
            <TabsTrigger value="zoho">Zoho Mail</TabsTrigger>
            <TabsTrigger value="custom">Custom Domain</TabsTrigger>
          </TabsList>

          <TabsContent value="gmail" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gmail SMTP Settings</CardTitle>
                <CardDescription>
                  Configure your Gmail account to send emails through our platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Step 1: Enable 2-Step Verification</h3>
                  <p>Before creating an app password, you need to enable 2-Step Verification on your Google Account:</p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Go to your <a href="https://myaccount.google.com/security" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Account Security page</a></li>
                    <li>Select "2-Step Verification" under "Signing in to Google"</li>
                    <li>Follow the on-screen instructions to turn it on</li>
                  </ol>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Step 2: Create an App Password</h3>
                  <p>After enabling 2-Step Verification:</p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Go to your <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Account App passwords page</a></li>
                    <li>Select "Mail" as the app and "Other (Custom name)" as the device</li>
                    <li>Enter a name (e.g., "Email Workflow")</li>
                    <li>Click "Generate"</li>
                    <li>Save the 16-character password that appears (you'll need it for the SMTP settings)</li>
                  </ol>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Step 3: Use these SMTP settings in our platform</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-md border relative">
                      <div className="font-medium mb-2">SMTP Server</div>
                      <div className="flex items-center justify-between group">
                        <code className="text-sm">smtp.gmail.com</code>
                        <Button
                          variant="ghost" 
                          size="sm" 
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => copyToClipboard("smtp.gmail.com", "gmail-server")}
                        >
                          {copied === "gmail-server" ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md border relative">
                      <div className="font-medium mb-2">Port</div>
                      <div className="flex items-center justify-between group">
                        <code className="text-sm">587 (TLS) or 465 (SSL)</code>
                        <Button
                          variant="ghost" 
                          size="sm" 
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => copyToClipboard("587", "gmail-port")}
                        >
                          {copied === "gmail-port" ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md border relative">
                      <div className="font-medium mb-2">Username</div>
                      <div className="flex items-center justify-between group">
                        <code className="text-sm">Your full Gmail address</code>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md border relative">
                      <div className="font-medium mb-2">Password</div>
                      <div className="flex items-center justify-between">
                        <code className="text-sm">Your app password</code>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Alert className="bg-blue-50 border-blue-200 mt-4">
                  <Info className="h-5 w-5 text-blue-600" />
                  <AlertTitle className="text-blue-800">Tip</AlertTitle>
                  <AlertDescription className="text-blue-700">
                    If you're having trouble sending emails, make sure "Less secure app access" is turned off in your Google Account settings. App passwords provide a more secure alternative.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="outlook" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Outlook SMTP Settings</CardTitle>
                <CardDescription>
                  Configure your Outlook.com or Microsoft 365 account to send emails through our platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Step 1: Create an App Password</h3>
                  <p>If you have two-step verification enabled, you'll need to create an app password:</p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Sign in to your <a href="https://account.microsoft.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Microsoft account</a></li>
                    <li>Go to "Security" > "Advanced security options"</li>
                    <li>Under "App passwords", select "Create a new app password"</li>
                    <li>Save the password that appears (you'll need it for the SMTP settings)</li>
                  </ol>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Step 2: Use these SMTP settings in our platform</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-md border relative">
                      <div className="font-medium mb-2">SMTP Server</div>
                      <div className="flex items-center justify-between group">
                        <code className="text-sm">smtp.office365.com</code>
                        <Button
                          variant="ghost" 
                          size="sm" 
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => copyToClipboard("smtp.office365.com", "outlook-server")}
                        >
                          {copied === "outlook-server" ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md border relative">
                      <div className="font-medium mb-2">Port</div>
                      <div className="flex items-center justify-between group">
                        <code className="text-sm">587</code>
                        <Button
                          variant="ghost" 
                          size="sm" 
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => copyToClipboard("587", "outlook-port")}
                        >
                          {copied === "outlook-port" ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md border relative">
                      <div className="font-medium mb-2">Username</div>
                      <div className="flex items-center justify-between">
                        <code className="text-sm">Your full email address</code>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md border relative">
                      <div className="font-medium mb-2">Password</div>
                      <div className="flex items-center justify-between">
                        <code className="text-sm">Your password or app password</code>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="yahoo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Yahoo Mail SMTP Settings</CardTitle>
                <CardDescription>
                  Configure your Yahoo Mail account to send emails through our platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Step 1: Create an App Password</h3>
                  <p>Yahoo requires an app password for third-party email applications:</p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Sign in to your <a href="https://login.yahoo.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Yahoo account</a></li>
                    <li>Go to "Account Info" > "Account Security"</li>
                    <li>Click on "Generate app password" or "Manage app passwords"</li>
                    <li>Select "Other app" and provide a name</li>
                    <li>Save the password that Yahoo generates for you</li>
                  </ol>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Step 2: Use these SMTP settings in our platform</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-md border relative">
                      <div className="font-medium mb-2">SMTP Server</div>
                      <div className="flex items-center justify-between group">
                        <code className="text-sm">smtp.mail.yahoo.com</code>
                        <Button
                          variant="ghost" 
                          size="sm" 
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => copyToClipboard("smtp.mail.yahoo.com", "yahoo-server")}
                        >
                          {copied === "yahoo-server" ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md border relative">
                      <div className="font-medium mb-2">Port</div>
                      <div className="flex items-center justify-between group">
                        <code className="text-sm">587</code>
                        <Button
                          variant="ghost" 
                          size="sm" 
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => copyToClipboard("587", "yahoo-port")}
                        >
                          {copied === "yahoo-port" ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md border relative">
                      <div className="font-medium mb-2">Username</div>
                      <div className="flex items-center justify-between">
                        <code className="text-sm">Your full Yahoo email address</code>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md border relative">
                      <div className="font-medium mb-2">Password</div>
                      <div className="flex items-center justify-between">
                        <code className="text-sm">Your app password</code>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="zoho" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Zoho Mail SMTP Settings</CardTitle>
                <CardDescription>
                  Configure your Zoho Mail account to send emails through our platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Step 1: Enable IMAP/POP in Zoho Mail</h3>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Log in to <a href="https://mail.zoho.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Zoho Mail</a></li>
                    <li>Go to "Settings" > "Mail Accounts"</li>
                    <li>Select the "IMAP/POP" tab</li>
                    <li>Enable IMAP access</li>
                  </ol>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Step 2: Create an App Password (if you use Two-Factor Authentication)</h3>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Go to your Zoho account > "Security" or "My Account" > "Security"</li>
                    <li>Under "App Passwords" or "Application Specific Passwords", create a new app password</li>
                    <li>Give it a name like "Email Workflow"</li>
                    <li>Save the password that Zoho generates</li>
                  </ol>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Step 3: Use these SMTP settings in our platform</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-md border relative">
                      <div className="font-medium mb-2">SMTP Server</div>
                      <div className="flex items-center justify-between group">
                        <code className="text-sm">smtp.zoho.com</code>
                        <Button
                          variant="ghost" 
                          size="sm" 
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => copyToClipboard("smtp.zoho.com", "zoho-server")}
                        >
                          {copied === "zoho-server" ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md border relative">
                      <div className="font-medium mb-2">Port</div>
                      <div className="flex items-center justify-between group">
                        <code className="text-sm">587</code>
                        <Button
                          variant="ghost" 
                          size="sm" 
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => copyToClipboard("587", "zoho-port")}
                        >
                          {copied === "zoho-port" ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md border relative">
                      <div className="font-medium mb-2">Username</div>
                      <div className="flex items-center justify-between">
                        <code className="text-sm">Your full Zoho email address</code>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md border relative">
                      <div className="font-medium mb-2">Password</div>
                      <div className="flex items-center justify-between">
                        <code className="text-sm">Your password or app password</code>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="custom" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Custom Domain SMTP Settings</CardTitle>
                <CardDescription>
                  Configure SMTP for your custom domain email
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Finding your SMTP settings</h3>
                  <p>If you're using a custom domain email, you'll need to get the SMTP settings from your email hosting provider. Common email hosting providers include:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Your web hosting company (e.g., GoDaddy, Bluehost, HostGator)</li>
                    <li>Your email hosting service (e.g., G Suite, Microsoft 365)</li>
                    <li>Your ISP, if they provide email hosting</li>
                  </ul>
                  <p>Look for "SMTP settings" or "Outgoing mail server settings" in your provider's documentation or control panel.</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Common SMTP ports and settings</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-md">
                      <thead>
                        <tr className="bg-gray-50 text-left">
                          <th className="py-2 px-4 border-b">Port</th>
                          <th className="py-2 px-4 border-b">Connection Type</th>
                          <th className="py-2 px-4 border-b">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-2 px-4 border-b">25</td>
                          <td className="py-2 px-4 border-b">Unencrypted/TLS</td>
                          <td className="py-2 px-4 border-b">Standard SMTP port (often blocked by ISPs)</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 border-b">465</td>
                          <td className="py-2 px-4 border-b">SSL</td>
                          <td className="py-2 px-4 border-b">SMTP over SSL</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 border-b">587</td>
                          <td className="py-2 px-4 border-b">TLS</td>
                          <td className="py-2 px-4 border-b">Modern secure SMTP (recommended)</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 border-b">2525</td>
                          <td className="py-2 px-4 border-b">TLS</td>
                          <td className="py-2 px-4 border-b">Alternative to 587 (if 587 is blocked)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg border space-y-4">
                  <h3 className="text-lg font-medium flex items-center">
                    <Info className="h-5 w-5 mr-2 text-blue-600" /> SMTP Information Checklist
                  </h3>
                  <p>For custom domain setup, you'll need to collect the following information:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>SMTP server address (e.g., smtp.yourdomain.com)</li>
                    <li>SMTP port (typically 587 or 465)</li>
                    <li>Username (usually your email address)</li>
                    <li>Password (your email password or app password)</li>
                    <li>Authentication type (usually PLAIN, LOGIN, or CRAM-MD5)</li>
                    <li>Connection security (TLS or SSL)</li>
                  </ul>
                </div>

                <Alert className="bg-blue-50 border-blue-200 mt-4">
                  <Info className="h-5 w-5 text-blue-600" />
                  <AlertTitle className="text-blue-800">Testing Tip</AlertTitle>
                  <AlertDescription className="text-blue-700">
                    After setting up your custom domain SMTP, we recommend sending a test email to verify everything is working correctly.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Separator className="my-8" />

        <div className="bg-gray-50 rounded-lg border p-6 space-y-4">
          <h2 className="text-2xl font-bold">Troubleshooting Common Issues</h2>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Connection Timeout</h3>
            <p>If you're experiencing connection timeouts:</p>
            <ul className="list-disc pl-6">
              <li>Check if your internet connection is stable</li>
              <li>Verify that the SMTP server address is correct</li>
              <li>Ensure your ISP is not blocking the SMTP port you're using</li>
              <li>Try an alternative port (e.g., 2525 instead of 587)</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Authentication Failed</h3>
            <p>If you see authentication errors:</p>
            <ul className="list-disc pl-6">
              <li>Double-check your username and password</li>
              <li>For Gmail/Outlook/Yahoo: Make sure you're using an app password if 2FA is enabled</li>
              <li>Verify that your account hasn't been locked for security reasons</li>
              <li>Check if your email provider requires additional security settings</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Sending Limits</h3>
            <p>Email providers often impose sending limits:</p>
            <ul className="list-disc pl-6">
              <li>Gmail: 500 emails per day for personal accounts, 2,000 for Google Workspace</li>
              <li>Outlook.com: 300 emails per day</li>
              <li>Yahoo Mail: 500 emails per day</li>
              <li>Custom domains: Varies by provider</li>
            </ul>
            <p>If you need to send larger volumes, consider using a dedicated email service provider.</p>
          </div>
        </div>

        <div className="text-center mt-12 space-y-4">
          <h2 className="text-2xl font-bold">Need more help?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            If you're still having trouble setting up your SMTP configuration, please contact our support team.
          </p>
          <Button size="lg" className="mt-4">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SmtpGuide;
