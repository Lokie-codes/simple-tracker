# Deployment Guide - Simple Tracker

## Frontend Deployment (Vercel - FREE)

### Step 1: Prepare Frontend
```bash
cd frontend/simple-tracker
npm run build
```

### Step 2: Deploy to Vercel
1. Push code to GitHub: `git push origin main`
2. Go to [vercel.com](https://vercel.com)
3. Sign up with GitHub
4. Click "Add New" → "Project"
5. Select your repository
6. Click "Deploy"

### Step 3: Configure Environment Variables (in Vercel)
- Go to Project Settings → Environment Variables
- Add: `VITE_API_BASE_URL` = `https://your-backend-url.onrender.com`

---

## Backend Deployment (Render - FREE)

### Step 1: Prepare Backend
- Code is ready with `requirements.txt` and `render.yaml`

### Step 2: Deploy to Render
1. Push code to GitHub: `git push origin main`
2. Go to [render.com](https://render.com)
3. Sign up with GitHub
4. Click "New" → "Web Service"
5. Select your repository
6. Connect to your `backend` directory
7. Click "Create Web Service"

### Step 3: Render will automatically:
- Install dependencies from `requirements.txt`
- Run migrations
- Collect static files
- Start the Django server

### Step 4: Get Your Backend URL
- Once deployed, you'll get a URL like: `https://simple-tracker-backend-xxxx.onrender.com`
- Copy this URL

### Step 5: Configure Backend
After deployment, go to Render dashboard:
1. Select your service
2. Go to "Environment" 
3. Add environment variables:
   - `FRONTEND_URL`: `https://your-vercel-url.vercel.app`
   - `DEBUG`: `False`
   - `ALLOWED_HOSTS`: `simple-tracker-backend-xxxx.onrender.com,your-vercel-url.vercel.app`

---

## Complete Deployment Checklist

### Backend (Render)
- [ ] Push code to GitHub
- [ ] Create Render account
- [ ] Deploy web service
- [ ] Set environment variables
- [ ] Test endpoints with Postman
- [ ] Get backend URL

### Frontend (Vercel)  
- [ ] Update VITE_API_BASE_URL with backend URL
- [ ] Push code to GitHub
- [ ] Create Vercel account
- [ ] Deploy project
- [ ] Test login and schedule features

---

## Testing After Deployment

1. **Test Backend API**:
   ```bash
   curl -X POST https://your-backend-url/api/auth/register/ \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"Test123!","password2":"Test123!"}'
   ```

2. **Test Frontend**:
   - Visit your Vercel URL
   - Register a new account
   - Create a schedule entry
   - Verify data saves

---

## Free Tier Limitations

**Render (Backend):**
- Free tier spins down after 15 min of inactivity (takes ~30s to wake up)
- 1 free Web Service, 1 free PostgreSQL database
- 100 GB/month bandwidth

**Vercel (Frontend):**
- Unlimited projects and deployments
- Auto SSL certificate
- Fast global CDN

---

## Optional Improvements

1. **Custom Domain**: Add your domain in project settings
2. **Auto-Deploy**: Both platforms auto-deploy on GitHub push
3. **Monitoring**: Set up error tracking with Sentry
4. **Database Backups**: Render includes automatic backups
5. **CI/CD**: Both platforms include built-in CI/CD

---

## Troubleshooting

### Backend won't start
- Check `render.yaml` syntax
- Verify all packages in `requirements.txt`
- Check environment variables are set

### Frontend can't reach backend
- Verify backend URL in `VITE_API_BASE_URL`
- Check CORS settings in Django
- Verify `FRONTEND_URL` in backend env vars

### Database errors
- Ensure migrations ran successfully
- Check PostgreSQL connection string
- Verify user permissions in database

---

## Next Steps

1. Initialize Git repository if not done:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/simple-tracker.git
   git push -u origin main
   ```

2. Follow the deployment steps above
3. Share your app with friends!
