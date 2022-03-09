# ATM Cash Dispenser

**Prerequisite**

- Python: 3.8.8

## How to run

### 1. Create venv

- Change directory into project
- Execute below command:

```bash
python -m venv ./venv
```

- Activate venv

```bash
# Ubuntu
source ./venv/bin/activate

# Window PowerShell
./.venv/Scripts/Activate.ps1
```

### 2. Install requirements

- Execute below command:

```bash
pip install -r requirements.txt
```

### 3. Setup env file

- Copy `.env.example` to `.env`
- Edit `.env` if necessary

### 4. Run API

- Execute below command:

```bash
python main.py
```

## API Description

- Open browser
- Access `http://localhost:3002/documentation`
