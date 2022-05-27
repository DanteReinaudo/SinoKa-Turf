contract SinoKoin is ERC20Interface {
    
    using SafeMath for uint;
    
    string public constant symbol = "SNK";
    string public  constant name = "Sino-Koin";
    uint8 public constant decimals = 2;
    uint _totalSupply;
    
    mapping(address => uint) balances;
    mapping(address => mapping(address => uint)) allowed;
    
    // ------------------------------------------------------------------------
    // Constructor
    // ------------------------------------------------------------------------
    constructor (uint256 initialSupply) public{
        totalSupply_ = initialSupply;
        balances[msg.sender]=totalSupply_;
    }
    
    // ------------------------------------------------------------------------
    // Fixed Total supply
    // ------------------------------------------------------------------------
    function totalSupply() public view returns (uint) {
        return _totalSupply;
    }
    
    // ------------------------------------------------------------------------
    // Get the token balance for account `tokenOwner`
    // ------------------------------------------------------------------------
    function balanceOf(address tokenOwner) public view returns (uint balance) {
        return balances[tokenOwner];
    }
    
    // ------------------------------------------------------------------------
    // Transfer the balance from token owner's account to `to` account
    // - Owner's account must have sufficient balance to transfer
    // - 0 value transfers are allowed
    // ------------------------------------------------------------------------
    function transfer(address to, uint tokens) public returns (bool success) {
        balances[msg.sender] = balances[msg.sender].sub(tokens);
        balances[to] = balances[to].add(tokens);
        emit Transfer(msg.sender, to, tokens);
        return true;
    }
    
    // ------------------------------------------------------------------------
    // Token owner can approve for `spender` to transferFrom(...) `tokens`
    // from the token owner's account
    //
    // https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20-token-standard.md
    // recommends that there are no checks for the approval double-spend attack
    // as this should be implemented in user interfaces 
    // ------------------------------------------------------------------------
    function approve(address spender, uint tokens) public returns (bool success) {
        allowed[msg.sender][spender] = tokens;
        emit Approval(msg.sender, spender, tokens);
        return true;
    }
    
    // ------------------------------------------------------------------------
    // Transfer `tokens` from the `from` account to the `to` account
    // 
    // The calling account must already have sufficient tokens approve(...)-d
    // for spending from the `from` account and
    // - From account must have sufficient balance to transfer
    // - Spender must have sufficient allowance to transfer
    // - 0 value transfers are allowed
    // ------------------------------------------------------------------------
    function transferFrom(address from, address to, uint tokens) public returns (bool success) {
        balances[from] = balances[from].sub(tokens);
        allowed[from][msg.sender] = allowed[from][msg.sender].sub(tokens);
        balances[to] = balances[to].add(tokens);
        emit Transfer(from, to, tokens);
        return true;
    }

    // ------------------------------------------------------------------------
    // Returns the amount of tokens approved by the owner that can be
    // transferred to the spender's account
    // ------------------------------------------------------------------------
    function allowance(address tokenOwner, address spender) public view returns (uint remaining) {
        return allowed[tokenOwner][spender];
    }
    

    // ------------------------------------------------------------------------
    // Fallback function. Don't accept ETH
    // ------------------------------------------------------------------------
    function () public payable {
        revert();
    }

}

contract ERC20Basic is IERC20{
string public constant name = «Observatorio Blockchain Prueba»;
string public constant symbol =»OBP»;
uint public constant decimals= 2;
event Transfer(address indexed from, address indexed to, uint256 tokens);
event Approval(address indexed owner, address indexed spender, uint256 tokens);
using SafeMath for uint256;
mapping(address=>uint) balances;
mapping (address => mapping (address => uint)) allowed;
uint256 totalSupply_;
constructor (uint256 initialSupply) public{
    totalSupply_ = initialSupply;
    balances[msg.sender]=totalSupply_;
}
function totalsupply() public override view returns (uint256){
 return totalSupply_;
}
function increaseTotalSupply(uint newTokensAmount) public {
    totalSupply_+=newTokensAmount;
    balances[msg.sender]+= newTokensAmount;
}
function balanceOf(address tokenOwner) public override view returns (uint256){
    return balances[tokenOwner];
    }
    function allowance(address owner, address delegate) public override view returns (uint256){
        return allowed[owner][delegate];
    }
    function transfer(address recipient, uint256 numTokens) public override returns (bool){
        require(numTokens <=balances[msg.sender]);
        balances[msg.sender]=balances[msg.sender]. sub(numTokens);
        balances[recipient]=balances[recipient].add(numTokens);
        emit Transfer(msg.sender, recipient, numTokens);
        return true;
    }
    function approve(address delegate, uint256 numTokens) public override returns (bool){
        allowed[msg.sender][delegate]=numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        return true;
    }
    function transferFrom(address owner, address buyer, uint256 numTokens) public override returns (bool){
        require(numTokens <= balances[owner]);
        require(numTokens <= allowed[owner][msg.sender]);
        balances[owner]=balances[owner].sub(numTokens);
        allowed[owner][msg.sender]=allowed[owner][msg.sender].sub(numTokens);
        balances[buyer]=balances[buyer].add(numTokens);
        emit Transfer (owner, buyer, numTokens);
        return true;
    }
}