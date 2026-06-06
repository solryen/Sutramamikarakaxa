/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { ArticleProvider } from './contexts/ArticleContext';
import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ExplorePage } from './pages/ExplorePage';
import { ArticlePage } from './pages/ArticlePage';
import { SignUpPage } from './pages/SignUpPage';
import { AdminPage } from './pages/AdminPage';
import { NewArticlePage } from './pages/NewArticlePage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ArticleProvider>
          <Router>
            <div className="flex min-h-screen flex-col font-sans text-stone-900 bg-stone-50 selection:bg-orange-200">
              <Header />
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<Navigate to="/explore" replace />} />
                  <Route path="/explore" element={<ExplorePage />} />
                  <Route path="/explore/articles/:slug" element={<ArticlePage />} />
                  <Route path="/explore/sign-in" element={<SignUpPage />} />
                  <Route path="/explore/dashboard" element={<AdminPage />} />
                  <Route path="/explore/new-article" element={<NewArticlePage />} />
                  <Route path="/explore/privacy" element={<PrivacyPage />} />
                  <Route path="/explore/terms" element={<TermsPage />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </Router>
        </ArticleProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
